<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <title>Document</title>
</head>

<body>


    <div class="right__table">
        <p class="right__tableTitle">Danh sách đơn hàng</p>
        <div class="right__tableWrapper">
            <?PHP
            if (!empty($data)) {
            ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID Bill</th>
                            <th>ID User</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th>Detail</th>

                        </tr>
                    </thead>

                    <tbody>
                        <?php

                        foreach ($data as $value) {         ?>
                            <tr>
                                <td><?php echo $value->idBill ?></td>
                                <td><?php echo $value->idUser?></td>
                                <td><?php echo $value->total ?></td>
                                <td><?php echo $value->date ?></td>
                                <td>
                                <a  href="?act=bill&delete=<?PHP echo $value->idBill ?>" class="btn-edit">Delete</a>
                                </td>
                                <td>
                                <a  href="?act=bill&detail=<?PHP echo $value->idBill ?>" class="btn-edit">Detail</a>
                                </td>
                            </tr>
                        <?php }
                    } else { ?>
                        <h1> Hiện không có dữ liệu trong bảng</h1>



                    <?PHP } ?>
                    </tbody>
                </table>
        </div>
    </div>
    </div>
</body>

</html>