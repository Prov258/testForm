<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';
    // require 'path/to/PHPMailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    //От кого письмо
    // $mail->setFrom('noobmaster25832@gmail.com', 'Da');
    $mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'Your site');
    //Кому отправить
    $mail->addAdress('mihailkvadratov543@gmail.com');
    //Тема письма
    $mail->Subject = 'Тема письма!';

    //Тело письма
    $body = '<h1>Форма</h1>'

    if(trim(!empty($_POST['name']))){
        $body.= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.= '<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['Phone number']))){
        $body.= '<p><strong>Номер телефона:</strong> '.$_POST['Phone number'].'</p>';
    }
    if(trim(!empty($_POST['commentary']))){
        $body.= '<p><strong>Комментарий:</strong> '.$_POST['commentary'].'</p>';
    }

    //Прикрепить файл
    if(!empty($_FILES['image']['tmp_name'])){
        //путь загрузки файла
        $filePath = __DIR__ . "files" . $_FILES['image']['name'];
        //грузим файл
        if(copy($_FILES['image']['tmp_name'], $filePath)){
            $fileAttach = $filePath;
            $body.='<><strong>Фото в приложении</strong>';
            $->addAttachment($fileAttach);
        }
    }

    $mail->Body = $body;

    //Отправляем
    if(!$mail->send()){
        $message = 'Ошибка';
    } else{
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>