$("#update_user").submit((evt) => {
    evt.preventDefault();
    let rawArr = $("#update_user").serializeArray();

    let data = {};
    for (let i = 0; i < rawArr.length; i++) {
        data[rawArr[i].name] = rawArr[i].value;
    }
    console.log(data);

    let request = {
        url: `https://dbmanager-nodejs.herokuapp.com/api/users/${data.id}`,
        method: "PUT",
        data: data,
    };

    $.ajax(request).done(function (response) {
        alert("Data Updated");
    });
});

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");

    $ondelete.click(function () {
        let id = $(this).attr("data-id");
        let name = $(this).attr("data-name");
        let request = {
            url: `https://dbmanager-nodejs.herokuapp.com/api/users/${id}`,
            method: `DELETE`,
        };
        console.log("DELETING");
        $.ajax(request).done(function (response) {
            alert("Data Deleted Successfully");
            location.reload();
        });
    });
}
