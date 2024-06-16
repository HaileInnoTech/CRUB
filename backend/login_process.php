<?php
require_once 'settings.php';
// Get the POSTed form data
$data = json_decode(file_get_contents('php://input'), true);

// Validate the form data (e.g., check if the username and password are correct)
if ($data['username'] === 'admin' && $data['password'] === 'matkhaulaloz02') {
    // If the username and password are correct, set a session variable and send a success response
    session_start();
    $_SESSION['username'] = $data['username'];
    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
} else {
    // If the username and password are incorrect, send an error response
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
}

?>