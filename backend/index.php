<?php
header("Access-Control-Allow-Origin: *");
$table = new PDO("sqlite:data.db");
$students = $table->query("SELECT * FROM students")->fetchAll();

echo json_encode($students);