<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Header</title>
    <link rel="stylesheet" href="css/mine.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
<div class="header">
    <a href="#" class="logo">CompanyLogo</a>
    <div class="header-right">
        <a href="#">Select Area</a>
        <a href="#">Filter </a>
        <a href="#">Extract</a>
    </div>
</div>
<script>
    $(document).ready(function() {
        $(".header-right a").click(function () {
            $(".header-right a").removeClass("active")
            $(this).addClass("active");
        })
    })
</script>
</body>
</html>