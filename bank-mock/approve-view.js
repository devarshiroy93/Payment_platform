export function generateApproveView(amount,token) {

    const approveViewHTML = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Approval</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
        }
        .transaction-container {
            text-align: center;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .transaction-info {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .hidden-input{
        display: none
        }
        .approve-button {
            padding: 15px 30px;
            font-size: 18px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        .approve-button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>
    <div class="transaction-container">
    <form action="/approve-payment" method="POST">
     <div class="transaction-info">
            <div>Transaction Amount: Rs.${amount}</div>
            <input class ="hidden-input" name="amount" value=${amount} />
            <input class ="hidden-input" name="token" value=${token} />
            <div>Merchant Name: Example Store</div>
    </div>
    <button type="submit" class="approve-button">Approve Transaction</button>
    </form>

       
    </div>
</body>
</html>`;

    return approveViewHTML;
}