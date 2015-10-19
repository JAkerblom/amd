$('#add').on('submit', function() {
        var     that = $(this),
            contents = that.serialize();

        $.ajax({
                url: "Sample 8 - Azure ML Studio",
                dataType: "json",
                type: "post",
                data: contents,
                success: function(data) {
                        if(data.success) {
                                alert('The result is ' + data.result);
                        }
                }
        });

        return false;
});

