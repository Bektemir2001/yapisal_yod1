<?php

header("Access-Control-Allow-Origin: *");

if (isset($_POST['id'])) {
    $table = new PDO("sqlite:data.db");
    $id = $_POST['id'];
    $sql = "DELETE FROM students WHERE id=?";
    $stmt= $table->prepare($sql);
    $stmt->execute([$id]);
    echo json_encode(['message' => 'student successfly deletet']);
}
else{
    echo json_encode(['error' => 'Нет данных']);
}
