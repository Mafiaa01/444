function edit() {
    let id = document.getElementById('editID').value;
    let email = document.getElementById('editEmail').value;
    let password = document.getElementById('editPassword').value;
    let username = document.getElementById('editUsername').value;

    let selected = document.getElementById('editRoles');
    let new_Roles = [];
    for (let i = 0; i < selected.length; i++) {
        let option = selected.options[i];
        if (option.selected) {
            new_Roles.push(option.value);
        }
    }

    fetch('http://localhost:8080/api/edit', {
        method: 'PUT', body: JSON.stringify({
            id: id, email: email, password: password, username: username, roles: new_Roles
        }), headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            console.log(response);
            showAllUsers();
        })
        .catch(error => console.error('Error:', error));
}


function deleteUser(id) {
    fetch('http://localhost:8080/api/delete/' + id, {
        method: 'DELETE', headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            $('#' + id).remove();
        });
}

function getModalDelete(id) {

    fetch('http://localhost:8080/api/getUserById/' + id)
        .then(response => response.json())
        .then(user => {

            let adminSelect = "";
            let userSelect = "";

            for (let i = 0; i < user.roles.length; i++) {
                if (user.roles[i].name == "ADMIN") {
                    adminSelect = "selected";
                }
                if (user.roles[i].name == "USER") {
                    userSelect = "selected";
                }
            }

            let modal = document.getElementById('modalWindow');

            modal.innerHTML = '<div id="modalDelete" ' + '     class="modal fade" tabindex="-1" role="dialog"' + '     aria-labelledby="TitleModalLabel" aria-hidden="true" ' + '     data-backdrop="static" data-keyboard="false">' + '    <div class="modal-dialog modal-dialog-scrollable">' + '        <div class="modal-content">' + '            <div class="modal-header">' + '                <h5 class="modal-title" id="TitleModalLabel">Delete user</h5>' + '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '                    <span aria-hidden="true">&times;</span>' + '                </button>' + '            </div>' + '            <div class="modal-body bg-white">' + '                <form id="formEditUser" style="width: 200px;" ' + '                       class="form-signin mx-auto font-weight-bold text-center">' + '                    <p>' + '                        <label>ID</label>' + '                        <input class="form-control form-control-sm" type="text"' + '                               name="id" value="' + user.id + '" readonly>' + '                    </p>' + '                    <p>' + '                        <label>Email</label>' + '                        <input class="form-control form-control-sm" type="text"' + '                               value="' + user.email + '" readonly>' + '                    </p>' + '                    <p>' + '                        <label>Password</label>' + '                        <input class="form-control form-control-sm" type="password"' + '                               value="' + user.password + '" readonly>' + '                    </p>' + '                    <p>' + '                        <label>Username</label>' + '                        <input class="form-control form-control-sm" type="text"' + '                               value="' + user.username + '" readonly>' + '                    </p>' + '                     <p>' + '                        <label>Role</label>' + '                        <select class="form-control form-control-sm" multiple size="2" readonly>' + '                            <option value="ADMIN"' + adminSelect + ' >ADMIN</option>' + '                            <option value="USER"' + userSelect + '>USER</option>' + '                        </select>' + '                    </p>' + '                </form>' + '            </div>' + '            <div class="modal-footer">' + '                <button type="button" class="btn btn-secondary"' + '                        data-dismiss="modal">Close</button>' + '                <button class="btn btn-danger" data-dismiss="modal"' + '                        onclick="deleteUser(' + user.id + ')">Delete</button>' + '            </div>' + '        </div>' + '    </div>' + '</div>';

            $("#modalDelete").modal();

        });
}

function getModalEdit(id) {

    fetch('http://localhost:8080/api/getUserById/' + id)
        .then(response => response.json())
        .then(user => {

            let modal = document.getElementById('modalWindow');

            modal.innerHTML = '<div id="modalEdit"' + '     class="modal fade" tabindex="-1" role="dialog"' + '     aria-labelledby="TitleModalLabel" aria-hidden="true"' + '     data-backdrop="static" data-keyboard="false">' + '    <div class="modal-dialog modal-dialog-scrollable">' + '        <div class="modal-content">' + '            <div class="modal-header">' + '                <h5 class="modal-title" id="TitleModalLabel">Edit user</h5>' + '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '                    <span aria-hidden="true">&times;</span>' + '                </button>' + '            </div>' + '            <div class="modal-body bg-white">' + '                <form id="formEditUser" style="width: 200px;"' + '                       class="form-signing mx-auto font-weight-bold text-center">' + '                    <p>' + '                        <label>ID</label>' + '                        <input class="form-control form-control-sm" type="text"' + '                               id="editID" name="id" value="' + user.id + '" readonly>' + '                    </p>' + '                    <p>' + '                        <label>Email</label>' + '                        <input class="form-control form-control-sm" type="text"' + '                               id="editEmail" value="' + user.email + '"' + '                               placeholder="Email" required>' + '                    </p>' + '                    <p>' + '                        <label>Password</label>' + '                        <input class="form-control form-control-sm" type="password"' + '                               id="editPassword" value="' + user.password + '" ' + '                               placeholder="Password" required>' + '                    </p>' + '                    <p>' + '                        <label>Username</label>' + '                        <input class="form-control form-control-sm" type="text"' + '                               id="editUsername" value="' + user.username + '"' + '                               placeholder="Username" required>' + '                    </p>' + '                    <p>' + '                        <label>Role</label>' + '                        <select id="editRoles" name="roles" multiple size="2" required ' + '                               class="form-control form-control-sm" title="Select Roles">' + '                            <option value="ADMIN">ADMIN</option>' + '                            <option value="USER">USER</option>' + '                        </select>' + '                    </p>' + '                </form>' + '            </div>' + '            <div class="modal-footer">' + '                <button type="button" class="btn btn-secondary"' + '                        data-dismiss="modal" >Close</button>' + '                <button class="btn btn-primary" data-dismiss="modal"' + '                        onclick="edit()">Edit</button>' + '            </div>' + '        </div>' + '    </div>' + '</div>';

            $("#modalEdit").modal();

        });
}

function newUser() {
    let email = document.getElementById('newEmail').value;
    let password = document.getElementById('newPassword').value;
    let username = document.getElementById('newUsername').value;

    let selected = document.getElementById('newRoles');
    let new_Roles = [];
    for (let i = 0; i < selected.length; i++) {
        let option = selected.options[i];
        if (option.selected) {
            new_Roles.push(option.value);
        }
    }

    function formClear() {
        $("#newEmail").val("");
        $("#newPassword").val("");
        $("#newUsername").val("");
        $('#USER').prop('selected', false);
        $('#ADMIN').prop('selected', false);
    }

    fetch('http://localhost:8080/api/create', {
        method: 'POST', body: JSON.stringify({
            email: email, password: password, username: username, roles: new_Roles
        }), headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(() => {
            formClear();
            window.location.href = "/admin";
        })
        .catch(error => console.error('Error:', error));
}


showAllUsers()

function showAllUsers() {
    let tBody = document.getElementById("tBody");
    tBody.innerHTML = "";
    fetch('http://localhost:8080/api/getUsers')
        .then(response => response.json())
        .then(users => {
            users.forEach(function (user) {
                var row = tBody.insertRow();
                row.setAttribute("id", user.id);
                var cell0 = row.insertCell();
                cell0.innerHTML = user.id;
                var cell1 = row.insertCell();
                cell1.innerHTML = user.email;
                var cell2 = row.insertCell();
                cell2.innerHTML = user.password;
                var cell3 = row.insertCell();
                cell3.innerHTML = user.username;
                var cell4 = row.insertCell();
                cell4.innerHTML = user.roleName;
                var cell5 = row.insertCell();
                cell5.innerHTML = '<button type="button" onclick="getModalEdit(' + user.id + ')" class="btn btn-primary btn-sm">Edit</button>';

                var cell6 = row.insertCell();
                cell6.innerHTML = '<button type="button" onclick="getModalDelete(' + user.id + ')" class="btn btn-danger btn-sm">Delete</button>';
            })
        });
}

showHeader();

function showHeader() {
    fetch('http://localhost:8080/api/getUser')
        .then(response => response.json())
        .then(user => {
            document.getElementById("header_username").innerHTML = user.username;
            document.getElementById("header_roles").innerHTML = 'with roles: ' + user.roleName;
        });
}


showUserInfo();

function showUserInfo() {
    let tBody = document.getElementById("user_info");
    tBody.innerHTML = "";
    fetch('http://localhost:8080/api/getUser')
        .then(response => console.log(response.json()))
        .then(user => {
            var row = tBody.insertRow(0);
            var cell0 = row.insertCell(0);
            cell0.innerHTML = user.id;
            var cell1 = row.insertCell(1);
            cell1.innerHTML = user.email;
            var cell2 = row.insertCell(2);
            cell2.innerHTML = user.password;
            var cell3 = row.insertCell(3);
            cell3.innerHTML = user.username;
            var cell4 = row.insertCell(4);
            cell4.innerHTML = user.roleName;
        })
        .catch(err => console.error('Error: ', err));

}
