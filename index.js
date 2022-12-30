let student_nums = [];
$.ajax({
    type: "GET",
    url: 'http://127.0.0.1:8000/index.php',
    success: function(response)
    {
        let Table = document.getElementById("studentsTable");
        response = JSON.parse(response);
        for(let i = 0; i < response.length; i++){
            student_nums.push(response[i].student_num);
            let row = Table.insertRow(i);
            row.id = "student"+response[i].id;
            row.insertCell(0).innerHTML = response[i].id;
            row.insertCell(1).innerHTML = response[i].student_num;
            row.insertCell(2).innerHTML = response[i].name;
            row.insertCell(3).innerHTML = response[i].faculty;
            row.insertCell(4).innerHTML = '<div class="text-center"> <button class="btn btn-danger" onclick="deleteStudent('+response[i].id+')">Delete</button></div>';
        }
   }
  });
function showForm(){
    let button = document.getElementById("buttonForm");
    let form = document.getElementById("studentForm");
    button.className = "d-none";
    form.className = "";
}
function closeForm(){
    let button = document.getElementById("buttonForm");
    let form = document.getElementById("studentForm");
    document.getElementById("studentNumId").value = "";
    document.getElementById("studentNameId").value = "";
    document.getElementById("studentFacultyId").value = "";
    document.getElementById("studentNumError").innerHTML = "";
    document.getElementById("studentNameError").innerHTML = "";
    document.getElementById("studentFacultyError").innerHTML = "";
    button.className = "btn btn-primary";
    form.className = "d-none";
}
function deleteStudent(id){
    $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:8000/delete.php',
        data:{id:id},
        success:function(response)
        {
            response = JSON.parse(response);
            if(response.message){
                alert(response.message);
                document.getElementById("student"+id).outerHTML = "";
            }
        }
    });
}
function addStudent(){
    
    let data = validateAndGetData() ? validateAndGetData() : false;
    if(!data) return;
    $.ajax({
        type: "POST",
        url: 'http://127.0.0.1:8000/create.php',
        data:{student_num:data[0], name:data[1], faculty:data[2]},
        success: function(response)
        {
            let Table = document.getElementById("studentsTable");
            response = JSON.parse(response);
            if(response.error){
                document.getElementById("studentNumError").innerHTML = response.error;
            }
            else{
                let i = Table.rows.length;
                let row = Table.insertRow(i);
                row.id = "student"+response.id;
                row.insertCell(0).innerHTML = response.id;
                row.insertCell(1).innerHTML = response.student_num;
                row.insertCell(2).innerHTML = response.name;
                row.insertCell(3).innerHTML = response.faculty;
                row.insertCell(4).innerHTML = '<div class="text-center"> <button class="btn btn-danger" onclick="deleteStudent('+response.id+')">Delete</button></div>';
                closeForm();
            }
       }
      });
}
function validateAndGetData(){
    let student_num = document.getElementById("studentNumId").value;
    let student_name = document.getElementById("studentNameId").value;
    let student_faculty = document.getElementById("studentFacultyId").value;

    let student_num_error = document.getElementById("studentNumError");
    let student_name_error = document.getElementById("studentNameError");
    let student_faculty_error = document.getElementById("studentFacultyError");

    // Validate student num
    if(!student_num){
        student_num_error.innerHTML = "this filed is required";
        return false;
    }
    
    for(let i = 0; i < student_nums.length; i++){
        if(student_num == student_nums[i]){
            student_num_error.innerHTML = "this Student num already exists";
            return false;
        }
    }
    //Validate student name

    if(!student_name){
        student_name_error.innerHTML = "this filed is required";
        return false;
    }
    //Validate faculty
    if(!student_faculty){
        student_faculty_error.innerHTML = "this filed is required";
        return false;
    }
    student_num_error.innerHTML = "";
    student_name_error.innerHTML = "";
    student_faculty_error.innerHTML = "";
    return [student_num, student_name, student_faculty];


}