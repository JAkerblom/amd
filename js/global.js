$('#mlexec').on('submit', function() {
        var     that = $(this),
            contents = that.serialize();

        $.ajax({
                url: "Sample prediction - Azure ML Studio: RandomRegress",
                dataType: "json",
                type: "post",
                data: contents,
                success: function(data) {
                    alert('The result is ' + data.result);
                
                }
        });

        return false;
});

