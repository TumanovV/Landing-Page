<?php 
  $name = $_POST['user-name'];
  $phone = $_POST['phone-number'];
  $comment = $_POST['comment'];

  $disturb = $_POST['dont-disturb'];
  $disturb = isset($disturb) ? 'Нет' : 'Да';
  $mail_message = '
    <html>
        <head>
            <title>Заявка</title>
        </head>
        <body>
            <h2>Заказ</h2>
            <ul>
                <li>Имя: ' . $name . '</li>
                <li>Телефон: ' . $phone . '</li>
                <li>Сообщение к заказу: ' . $comment . '</li>
                <li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
            </ul>
        </body>
    </html>    
    ';
   

    $headers = "From: Personal computar >\r\n".
    "MIME-Version: 1.0" . "\r\n" .
    "Content-type: text/html; charset=UTF-8" . "\r\n";

    // $mail = mail('tumanoff.vadim@yandex.ru', 'Заказ', $mail_message, $headers);

    $data = [];

    if ($mail) {
      $data['status'] = "OK";
      $data['mes'] = "Письмо успешно отправлено";
    }else{
      $data['status'] = "NO";
      $data['mes'] = "На сервере произошла ошибка";
    }

    echo json_encode($data)// формируем json из массива
?>