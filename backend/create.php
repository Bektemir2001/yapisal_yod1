<?php
header("Access-Control-Allow-Origin: *");

if (isset($_POST['student_num']) && $_POST['name'] && isset($_POST['faculty'])) {
    
    $data = ['student_num' => $_POST['student_num'], 'name' => $_POST['name'], 'faculty' => $_POST['faculty']];
    if(validateStudentNum($data['student_num'])){
        $table = new PDO("sqlite:data.db");
        
        $sql = "INSERT INTO students (student_num, name, faculty) VALUES (?,?,?)";
        $stmt= $table->prepare($sql);
        $stmt->execute([$data['student_num'], $data['name'], $data['faculty']]);

        $id = $table->lastInsertId();
        $data['id'] = $id;
        echo json_encode($data);
    }
    else{
        echo json_encode(["error" => "wrong data format. It should be like this <b>nnnn.nnnnn</b>"]);
    }
    

}
else{
    echo json_encode(['message' => 'Нет данных']);
}



function validateStudentNum($student_num){

    $pattern = "/^[0-9]{4}\.[0-9]{5}$/";

    return preg_match($pattern, $student_num);
}