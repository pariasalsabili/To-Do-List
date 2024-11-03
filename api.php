<?php
header('Content-Type: application/json');

// Database connection
try {
    $pdo = new PDO('mysql:host=localhost;dbname=calendar_app', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

$action = $_GET['action'] ?? '';
$response = ['status' => 'error'];

switch ($action) {
    case 'getTasks':
        $date = $_GET['date'] ?? '';
        if ($date) {
            $stmt = $pdo->prepare("SELECT * FROM todos WHERE task_date = ?");
            $stmt->execute([$date]);
            $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response = ['status' => 'success', 'tasks' => $tasks];
        } else {
            $response = ['status' => 'error', 'message' => 'Date is missing'];
        }
        break;

    case 'addTask':
        $date = $_POST['date'] ?? '';
        $task = $_POST['task'] ?? '';
        if ($date && $task) {
            try {
                $stmt = $pdo->prepare("INSERT INTO todos (task_date, task_text) VALUES (?, ?)");
                $stmt->execute([$date, $task]);
                $response = ['status' => 'success'];
            } catch (Exception $e) {
                $response = ['status' => 'error', 'message' => 'Insert failed: ' . $e->getMessage()];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'Date or task is missing'];
        }
        break;

    case 'updateTask':
        $id = $_POST['id'] ?? '';
        $task = $_POST['task'] ?? '';
        $status = $_POST['status'] ?? '';
        if ($id && $task && $status) {
            try {
                $stmt = $pdo->prepare("UPDATE todos SET task_text = ?, status = ? WHERE id = ?");
                $stmt->execute([$task, $status, $id]);
                $response = ['status' => 'success'];
            } catch (Exception $e) {
                $response = ['status' => 'error', 'message' => 'Update failed: ' . $e->getMessage()];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'ID, task, or status is missing'];
        }
        break;

    case 'deleteTask':
        $id = $_POST['id'] ?? '';
        if ($id) {
            try {
                $stmt = $pdo->prepare("DELETE FROM todos WHERE id = ?");
                $stmt->execute([$id]);
                $response = ['status' => 'success'];
            } catch (Exception $e) {
                $response = ['status' => 'error', 'message' => 'Delete failed: ' . $e->getMessage()];
            }
        } else {
            $response = ['status' => 'error', 'message' => 'ID is missing'];
        }
        break;

    default:
        $response = ['status' => 'error', 'message' => 'Invalid action'];
        break;
}

// Send JSON response
echo json_encode($response);
