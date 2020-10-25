    $(document).ready(function () {
        //Disable submit button on click
        $("#SubmitButton").click(function () {
            //wait 0.3 seconds and disable submit button
            setTimeout(
                function () {
                    $('#SubmitButton').prop('disabled', true);
                }, 300);
        });
    });