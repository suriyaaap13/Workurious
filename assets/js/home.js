{
    console.log("Hello World");

    let createNewBillEntry = function(){
        let newBillForm = $('#new-bill-form');
        newBillForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type: 'post',
                data: $('#new-bill-form').serialize(),
                url: '/post-data',
                success: function(data){
                    alert(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        })
    }
    createNewBillEntry();

}