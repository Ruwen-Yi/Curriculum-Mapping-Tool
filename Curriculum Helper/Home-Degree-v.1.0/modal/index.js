
// ---------------behavior of clicking button, show or hide the modal------------------
$("#button-addCourse").on("click", function () {
    $("#modal_container").addClass("modal-container-show");
    $("#edit-modal").hide();
    $("#add-new-modal").hide();
    $("#add-modal").show();
});

$("#button-editCourse").on("click", function () {
    $("#modal_container").addClass("modal-container-show");
    $("#add-modal").hide();
    $("#add-new-modal").hide();
    $("#edit-modal").show();
});

$("#button-addNewCourse").on("click", function () {
    $("#modal_container").addClass("modal-container-show");
    $("#add-modal").hide();
    $("#add-new-modal").show();
    $("#edit-modal").hide();
});


$("#button-close, #button-cancel").on("click", function () {
    $("#modal_container").removeClass("modal-container-show");

});

// saving button for add modal, need adding sending data function
$("#button-add").on("click", function () {
    $("#modal_container").removeClass("modal-container-show");

});

// saving button for edit modal, need adding sending data function
$("#button-save").on("click", function () {
    $("#modal_container").removeClass("modal-container-show");
});

// saving button for add new modal, need adding sending data function
$("#button-add-new").on("click", function () {
    $("#modal_container").removeClass("modal-container-show");

});

// saving button for delete modal, need adding removing data function
$("#button-delete").on("click", function () {
    $("#modal_container").removeClass("modal-container-show");
});


//add border shadow after card selection
$(":checkbox").on("click", function () {
    if ($(this).parent().hasClass("active")) {
        $(this).parent().removeClass("active");
    }
    else { $(this).parent().addClass("active"); }
});

//click edit button to make contenteditable, will combine into one function later
$("#btn-c-num").on("click", function () {
    if ($("#c-number").attr("contenteditable") == "false") {
        $("#c-number").attr("contenteditable", "true");
        $("#c-number").focus();
        $("#btn-c-num").html("<i class='fa fa-floppy-o fa-lg' aria-hidden='true'></i>");
    } else {
        $("#c-number").attr("contenteditable", "false");
        $("#btn-c-num").html("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>");
    }
});

$("#btn-c-name").on("click", function () {
    if ($("#c-name").attr("contenteditable") == "false") {
        $("#c-name").attr("contenteditable", "true");
        $("#c-name").focus();
        $("#btn-c-name").html("<i class='fa fa-floppy-o fa-lg' aria-hidden='true'></i>");
    } else {
        $("#c-name").attr("contenteditable", "false");
        $("#btn-c-name").html("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>");
    }
});

$("#btn-c-pre").on("click", function () {
    if ($("#c-pre").attr("contenteditable") == "false") {
        $("#c-pre").attr("contenteditable", "true");
        $("#c-pre").focus();
        $("#btn-c-pre").html("<i class='fa fa-floppy-o fa-lg' aria-hidden='true'></i>");
    } else {
        $("#c-pre").attr("contenteditable", "false");
        $("#btn-c-pre").html("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>");
    }
});

$("#btn-c-incom").on("click", function () {
    if ($("#c-incom").attr("contenteditable") == "false") {
        $("#c-incom").attr("contenteditable", "true");
        $("#c-incom").focus();
        $("#btn-c-incom").html("<i class='fa fa-floppy-o fa-lg' aria-hidden='true'></i>");
    } else {
        $("#c-incom").attr("contenteditable", "false");
        $("#btn-c-incom").html("<i class='fa fa-pencil-square-o fa-lg' aria-hidden='true'></i>");
    }
});

