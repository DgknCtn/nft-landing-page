<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Veritabanı bağlantısı
    $host = 'localhost';
    $db   = 'vanth';
    $user = 'joinv_vanth';
    $pass = 'vanth0697';
    
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"));
        
        // Veri kontrolü
        if (!isset($data->email) || !isset($data->wallet) || !isset($data->discord) || !isset($data->twitter)) {
            throw new Exception('Missing required fields');
        }

        // Email ve wallet kontrolü
        $stmt = $conn->prepare('SELECT COUNT(*) FROM whitelist WHERE email = ? OR wallet = ?');
        $stmt->execute([$data->email, $data->wallet]);
        
        if ($stmt->fetchColumn() > 0) {
            throw new Exception('Email or wallet already registered');
        }

        // Yeni kayıt
        $stmt = $conn->prepare('INSERT INTO whitelist (email, wallet, discord, twitter, status, created_at) VALUES (?, ?, ?, ?, "pending", NOW())');
        $stmt->execute([
            $data->email,
            $data->wallet,
            $data->discord,
            $data->twitter
        ]);

        echo json_encode(['success' => true, 'message' => 'Successfully registered for whitelist']);
    }
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
}
?>