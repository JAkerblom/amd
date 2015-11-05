$('#mlexec').on('submit', function() {
        var     that = $(this),
            contents = that.serialize();

        $.ajax({
                url: "Test php",
                dataType: "json",
                type: "post",
                data: contents,
                success: function(data) {
                	alert('The result is ' + data.Values);
                }
        });

        return false;
});

