let _modelEmployee = {
    IdEmployee: 0,
    FullName: "",
    IdDepartment: 0,
    Salary: 0,
    HireDate:""
}


function ShowEmployees() {

    fetch("/Home/GetEmployeeList")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {

            if (responseJson.length > 0) {

                //clean the table first
                $("#tableEmployee tbody").html("");

                //add information to the table
                responseJson.forEach((employee) => {

                    $("#tableEmployee tbody").append(
                        $("<tr>").append(
                            $("<td>").text(employee.fullName),
                            $("<td>").text(employee.refDepartment.name),
                            $("<td>").text(employee.salary),
                            $("<td>").text(employee.hireDate),
                            /*$("<td>").append(
                                $("<button>").addClass("btn btn-primary btn-sm button-edit-employee ms-2").text("Edit").data("dataEmployee", employee),
                            ),
                            $("<td>").append(
                                $("<button>").addClass("btn btn-danger btn-sm button-delete-employee ms-2").text("Delete").data("dataEmployee", employee),
                            )*/
                            $("<td>").addClass("d-flex").append(
                                $("<a>").addClass("btn btn-sm button-edit-employee").attr("title", "Edit").html('<i class="fas fa-edit"></i>').data("dataEmployee", employee),
                                $("<span>").text(" | "),
                                $("<a>").addClass("btn btn-sm button-delete-employee").attr("title", "Delete").html('<i class="fas fa-trash"></i>').data("dataEmployee", employee)
                            ),
                           
                            
                        )
                    )


                })
            }

        })


}


document.addEventListener('DOMContentLoaded', function () {

    //show employees
    ShowEmployees();

    //show departments in select
    fetch("/Home/GetDepartmentList")
        .then(response => {
            return response.ok ? response.json() : Promise.reject(response);
        })
        .then(responseJson => {
            if (responseJson.length > 0) {
                responseJson.forEach((department) => {
                    $("#txtDepartment").append(
                        $("<option>").val(department.idDepartment).text(department.name)
                    )
                })
            }
        })

    //show calendar in input

    $("#txtHireDate").datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        todayHighlight:true
    })

}, false)


function OpenModal() {

    $("#txtFullName").val(_modelEmployee.FullName);
    $("#txtDepartment").val(_modelEmployee.IdDepartment == 0 ? $("#txtDepartment option:first").val() : _modelEmployee.IdDepartment);
    $("#txtSalary").val(_modelEmployee.Salary)
    $("#txtHireDate").val(_modelEmployee.HireDate)

    //show modal
    $("#modalEmployee").modal("show");

}

//event when press the new employee button
$(document).on("click", ".button-new-employee", function () {

    _modelEmployee.IdEmployee = 0;
    _modelEmployee.FullName = "";
    _modelEmployee.IdDepartment = 0;
    _modelEmployee.Salary = 0;
    _modelEmployee.HireDate = "";

    OpenModal();

})

//event when press the edit button
$(document).on("click", ".button-edit-employee", function () {

    const _employee = $(this).data("dataEmployee");

    _modelEmployee.IdEmployee = _employee.idEmployee;
    _modelEmployee.FullName = _employee.fullName;
    _modelEmployee.IdDepartment = _employee.refDepartment.idDepartment;
    _modelEmployee.Salary = _employee.salary;
    _modelEmployee.HireDate = _employee.hireDate;

    OpenModal();

})

// event when press the close modal icon


$(document).on("click", ".btn-close", function () {

    // Attach a click event handler to the "Save changes" button
    // Clear previous validation messages
    $(".validation-error").remove();

})


//event when press the save changes button of the modal

$(document).on("click", ".button-save-changes-employee", function () {

        // Attach a click event handler to the "Save changes" button
        // Clear previous validation messages
        $(".validation-error").remove();

        // Perform non-empty validation
        var isValid = true;

        if ($("#txtFullName").val() === '') {
            $('<span class="validation-error" style="color: red;">Name is required*</span>').insertAfter("#txtFullName");
            isValid = false;
        }

        if ($("#txtDepartment").val() === '') {
            $('<span class="validation-error" style="color: red;">Department is required*</span>').insertAfter("#txtDepartment");
            isValid = false;
        }

        if ($("#txtSalary").val() === '') {
            $('<span class="validation-error" style="color: red;">Salary is required*</span>').insertAfter("#txtSalary");
            isValid = false;
        }

        if ($("#txtHireDate").val() === '') {
            $('<span class="validation-error" style="color: red;">Date is required*</span>').insertAfter("#txtHireDate");
            isValid = false;
        }

        // If all validations passed, submitForm() function call
        if (isValid) {

            //$("#modalEmployee").modal("hide");
            // Here, you might perform other actions, like form submission
            submitForm();

        }   
})



//event when press save changes button isValid == true 
function submitForm() {

    //employee model to save or update
    const model = {
        IdEmployee: _modelEmployee.IdEmployee,
        FullName: $("#txtFullName").val(),
        RefDepartment: {
            IdDepartment: $("#txtDepartment").val()
        },
        Salary: $("#txtSalary").val(),
        HireDate: $("#txtHireDate").val()
    }
    submit(model);
}


function submit(model) { 

    if (_modelEmployee.IdEmployee === 0) {

        console.log(model);

        fetch("/Home/SaveEmployee", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(model)
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response);
                //return response.ok ? console.log(response) : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.value) {
                    $("#modalEmployee").modal("hide");
                    alert("Employee registered successfully");
                    ShowEmployees();
                }
                else
                    alert("Employee registered unsuccessfully");

            })

    }
    else {

        fetch("/Home/EditEmployee", {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(model)
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.value) {
                    $("#modalEmployee").modal("hide");
                    alert("Employee updated successfully");
                    ShowEmployees();
                }
                else
                    alert("Employee updated unsuccessfully");

            })

    }

}




/*

//event when press the save changes button of the modal
$(document).on("click", ".button-save-changes-employee", function () {

    //employee model to save or update
    const model = {
        IdEmployee: _modelEmployee.IdEmployee,
        FullName: $("#txtFullName").val(),
        RefDepartment: {
            IdDepartment: $("#txtDepartment").val()
        },
        Salary: $("#txtSalary").val(),
        HireDate: $("#txtHireDate").val()
    }

    if (_modelEmployee.IdEmployee === 0) {

        console.log(model);

        fetch("/Home/SaveEmployee", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(model)
        })
            .then(response => {
                //return response.ok ? response.json() : Promise.reject(response);
                return response.ok ? console.log(response) : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.value) {
                    $("#modalEmployee").modal("hide");
                    alert("Employee registered successfully");
                    ShowEmployees();
                }
                else
                    alert("Employee registered unsuccessfully")

            })

    } else {

        fetch("/Home/EditEmployee", {
            method: "PUT",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(model)
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.value) {
                    $("#modalEmployee").modal("hide");
                    alert("Employee updated successfully");
                    ShowEmployees();
                }
                else
                    alert("Employee updated successfully")

            })


    }


})


*/


//event when press the delete button
/*$(document).on("click", ".button-delete-employee", function () {

    const _employee = $(this).data("dataEmployee");

    const result = confirm(`Do you want to delete the employee " ${_employee.fullName} " ?`);

    if (result) {
        fetch(`/Home/DeleteEmployee?idEmployee=${_employee.idEmployee}`, {
            method: "DELETE"
        })
            .then(response => {
                return response.ok ? response.json() : Promise.reject(response);
            })
            .then(responseJson => {

                if (responseJson.value) {
                    alert("Employee deleted successfully");
                    ShowEmployees();
                } else
                    alert("Employee deleted unsuccessfully");

            })

    }

})*/

$(document).on("click", ".button-delete-employee", function () {

    const _employee = $(this).data("dataEmployee");

    Swal.fire({
        title: `Do you want to delete the employee "${_employee.fullName}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`/Home/DeleteEmployee?idEmployee=${_employee.idEmployee}`, {
                method: "DELETE"
            })
                .then(response => {
                    return response.ok ? response.json() : Promise.reject(response);
                })
                .then(responseJson => {
                    if (responseJson.value) {
                        Swal.fire(
                            'Deleted!',
                            'Employee deleted successfully.',
                            'success'
                        );
                        ShowEmployees();
                    } else {
                        Swal.fire(
                            'Error!',
                            'Failed to delete employee.',
                            'error'
                        );
                    }
                });
        }
    });

});
