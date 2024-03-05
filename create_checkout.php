<?php
// Include the SumUp SDK and any necessary authentication logic

// Initialize the SumUp SDK and authenticate
$sumup = new SumUp($clientId, $clientSecret);

// Create a checkout service
$checkoutsService = $sumup->getCheckoutService();

// Create a checkout with the desired parameters
$response = $checkoutsService->create(
    10,             // Specify the amount of the payment
    'EUR',          // Specify the currency (in this case, Euro)
    'CO746453',     // Specify a reference or identifier for the checkout
    'docuser@sumup.com',    // Specify the email associated with the payment
    'Sample one-time payment',  // Specify a description for the payment
    'https://yourwebsite.com/checkout_success'  // Specify the URL where users should be redirected after payment
);

// Extract the checkout ID from the response body
$checkoutId = $response->getBody()->id;

// Redirect the user to the payment page with the checkout ID
header("Location: payment_page.php?checkout_id=$checkoutId");
exit;
?>
