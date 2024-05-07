$(document).ready(function () {
    function renderPage() {
        $.ajax({
            url: "http://localhost:3001/api/v1/hotel/room/getAllRoom",
            method: "GET",
            success: function (data) {
                var tableHtml = "";
                data.forEach(function (room) {
                    // Tạo HTML cho từng hàng trong bảng
                    tableHtml += "<tr>";
                    tableHtml += "<td>" + room.id + "</td>";
                    tableHtml += "<td>" + room.name + "</td>";
                    tableHtml += "<td>" + room.status + "</td>";
                    tableHtml += "<td>" + room.price + "</td>";
                    tableHtml += "<td>" + room.quantity + "</td>";
                    tableHtml += "<td>" + room.quantity_people + "</td>";
                    tableHtml += "<td>" + room.type_bed + "</td>";
                    tableHtml += "<td>" + room.hotelid + "</td>";

                    tableHtml += "<td>";
                    tableHtml +=
                        '<button type="button" class="updateRoom" value="' +
                        room.id + '">Chỉnh sửa</button>';
                    tableHtml +=
                        '<button type="button" class="deleteRoom" value="' +
                        room.id + '">Xóa</button>';
                    tableHtml += "</td>";
                    tableHtml += "</tr>";
                });
                // Render dữ liệu vào bảng
                $(".room-table table tbody").html(tableHtml);
            },
            error: function (xhr, status, error) {
                console.error(error);
                console.log('Lỗi khi render page room')
            },
        });
    }

    renderPage();

    // Sự kiện khi click vào nút "Thêm"
    $(".room-search-create").click(function () {
        $(".custom-popup-overlay").show();
        $(".custom-popup").show();
    });

    // Sự kiện khi click vào nút "Đóng" trong popup
    $(".custom-close-btn").click(function () {
        $(".custom-popup-overlay").hide();
        $(".custom-popup").hide();
    });

    // Sự kiện khi click vào nút "Đóng" trong popup thông báo xóa
    $(".close-btn1").click(function () {
        $(".popup-overlay-delete").hide();
        $(".popup-delete").hide();
    });

    // Sự kiện khi click vào nút "Xóa"
    $(document).on("click", ".deleteRoom", function () {
        let id = $(this).val();
        // Gửi yêu cầu xóa người dùng
        $.ajax({
            url: `http://localhost:3001/api/v1/hotel/room/deleteRoom/${id}`,
            method: "DELETE",
            success: function (data) {
                renderPage();
                $(".popup-overlay-delete").show();
                $(".popup-delete").show();
            },
            error: function (error) {
                console.log("Lỗi khi xóa người dùng", error);
            },
        });
    });


    $(".dkbutton").click(function () {
        var name = $("#name").val();
        var status = $("#status").val();
        var price = $("#price").val();
        var quantity = $("#quantity").val();
        var quantity_people = $("#quantity_people").val();
        var type_bed = $("#type_bed").val();
        var hotelid = $("#hotelid").val();

        var dataT = {
            name: name,
            status: status,
            price: price,
            quantity: quantity,
            quantity_people: quantity_people,
            type_bed: type_bed,
            hotelid: hotelid,
        };

        $.ajax({
            url: `http://localhost:3001/api/v1/hotel/room/createRoom`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(dataT),
            success: function (data) {
                renderPage();
                console.log("Phòng đã được tạo.");
            },
            error: function (error) {
                // Xử lý lỗi
                console.log("Đã xảy ra lỗi khi tạo phòng", error);
            },
        });
    });

    // Sự kiện khi click vào nút "Sửa"
    $(document).on("click", ".updateRoom", function () {
        var id = $(this).val();
        $(".popup-overlay").show();
        // Gửi yêu cầu để lấy chi tiết người dùng
        $.ajax({
            url: `http://localhost:3001/api/v1/hotel/room/getDetailRoom/${id}`,
            method: "GET",
            success: function (data) {
                console.log(data);
                $(".popup-overlay").html(`
          <div class="popup"> 
          <span class="close-btn">&times;</span> 
          <h2>Chỉnh sửa</h2> 
          <form id="updateForm"> 
          <input type="text" id="name" name="name" placeholder="Tên khách sạn" value="${data.name}" required>
          <input type="text" id="status" name="status" placeholder="Trạng thái" value="${data.status}"
             required> 
          <input type="text" id="price" name="price" placeholder="Giá" value="${data.price}" required> 
          <input type="text" id="quantity" name="quantity" placeholder="Số lượngn" value="${data.quantity}"
             required> 
          <input type="text" id="quantity_people" name="quantity_peopole" placeholder="Số lượng người"
             value="${data.quantity_people}" required> 
          <input type="text" id="type_bed" name="type_bed" placeholder="Loại giường" value="${data.type_bed}"
             required> 
          <input type="text" id="hotelid" name="hotelid" placeholder="ID của khách sạn"
             value="${data.hotelid}" required> 
              <div class="ebutton"> 
                  <input type="submit" value="Cập nhật"> 
                  </div> 
              </form> 
          </div> `);

                $(".ebutton").click(function () {
                    console.log(id);
                    const name = $("#name").val();
                    const status = $("#status").val();
                    const price = $("#price").val();
                    const quantity = $("#quantity").val();
                    const quantity_people = $("#quantity_people").val();
                    const type_bed = $("#type_bed").val();
                    const hotelid = $("#hotelid").val();

                    $.ajax({
                        url: `http://localhost:3001/api/v1/hotel/room/updateRoom/${id}`,
                        method: "PUT",
                        data: {
                            name,
                            status,
                            price,
                            quantity,
                            quantity_people,
                            type_bed,
                            hotelid,
                        },
                        success: function (data) {
                            renderPage();
                            console.log("Chỉnh sửa phòng thành công");
                        },
                        error: function (error) {
                            console.log("Lỗi khi chỉnh sửa phòng", error);
                        },
                    });
                });
                $(".close-btn").click(function () {
                    $(".popup-overlay").hide();
                });
            },
        });
    });
});
