<?php

$connection = mysqli_connect(
    "localhost",
    "root",
    "",
    "online exam"
);

if(!$connection){
    die(mysqli_connect_error());
}

$username = $_POST['username'];
$score = $_POST['score'];
$total = $_POST['total'];

$sql = "INSERT INTO results
(username, score, total, exam_date)
VALUES
('$username', '$score', '$total', NOW())";

if(mysqli_query($connection, $sql)){
    echo "Saved";
}
else{
    echo mysqli_error($connection);
}

?>
