$(document).ready(function () {
    // Hàm để render lại trang sau khi nhận dữ liệu mới từ server
    function renderPage() {
        $.ajax({
            url: "http://localhost:3001/api/v1/hotels/getAllHotel",
            method: "GET",
            success: function (data) {
                var tableHtml = "";
                data.forEach(function (hotel) {
                    // Tạo HTML cho từng hàng trong bảng
                    tableHtml += '<tr>';
                    tableHtml += '<td class="col1">' + hotel.id + "</td>";
                    tableHtml += '<td class="col2">' + hotel.name + "</td>";
                    tableHtml += '<td class="col1">' + hotel.rate + "</td>";
                    tableHtml += '<td class="col2">' + hotel.map + "</td>";
                    tableHtml += '<td class="col2">' + hotel.roomType + "</td>";
                    tableHtml += '<td class="col2">' + hotel.TypeHotel + "</td>";
                    tableHtml += '<td class="col2">' + hotel.status + "</td>";
                    tableHtml += '<td class="col2">' + hotel.cost + "</td>";
                    tableHtml += '<td class="col1">' + hotel.type + "</td>";
                    tableHtml += '<td class="col2">' + hotel.payment + "</td>";
                    tableHtml += "<td>";
                    //tableHtml += '<input type="file" name="file" id="fileInput" onChange={handleFileChange} multiple></input>';
                    tableHtml +=
                        '<button type="button" class="updateHotel" value="' +
                        hotel.id + '">Chỉnh sửa</button>';
                    tableHtml +=
                        '<button type="button" class="deleteHotel" value="' +
                        hotel.id + '">Xóa</button>';
                    tableHtml +=
                        '<button type="button" class="addRoom" value="' +
                        hotel.id + '">Thêm phòng</button>';

                    tableHtml += "</td>";
                    tableHtml += "</tr>";
                });
                // Render dữ liệu vào bảng
                $(".agent-table table tbody").html(tableHtml);
                console.log('Đang render page')

            },
            error: function (xhr, status, error) {
                console.error(error);
                console.log('Lỗi khi render page agent')
            },
        });
    }

    renderPage();


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        // Xử lý tệp tin theo nhu cầu của bạn
        console.log('Selected file:', file);
    };


    // Sự kiện khi click vào nút "Thêm"
    $(".agent-search-create").click(function () {
        window.location.href = `/agent/addHotel`;

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
    $(document).on("click", ".deleteHotel", function () {
        let id = $(this).val();
        // Gửi yêu cầu xóa người dùng
        $.ajax({
            url: `http://localhost:3001/api/v1/hotels/deleteHotel/${id}`,
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

    $(document).on("click", ".addRoom", function () {
        let id = $(this).val();
        window.location.href = `/agent/room/${id}`;
    });


    // Sự kiện khi click vào nút "Thêm khách sạn"
    $(".dkbutton").click(function () {
        var name = $("#name").val();
        var rate = $("#rate").val();
        var map = $("#map").val();
        var roomType = $("#roomType").val();
        var TypeHotel = $("#TypeHotel").val();
        var status = $("#status").val();
        var cost = $("#cost").val();
        var type = $("#type").val();
        var payment = $("#payment").val();

        var dataT = {
            name: name,
            rate: rate,
            map: map,
            roomType: roomType,
            TypeHotel: TypeHotel,
            status: status,
            cost: cost,
            type: type,
            payment: payment,
        };

        // Gửi yêu cầu thêm người dùng
        $.ajax({
            url: `http://localhost:3001/api/v1/hotels/createHotel`,
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify(dataT),
            success: function (data) {
                renderPage();
                console.log("Người dùng đã được tạo.");
                alert("Done");
                window.location.href = `/agent`;
            },
            error: function (error) {
                // Xử lý lỗi
                console.log("Đã xảy ra lỗi khi tạo người dùng:", error);
            },
        });

    });

    // Sự kiện khi click vào nút "Sửa"
    $(document).on("click", ".updateHotel", function () {
        var id = $(this).val();
        $(".popup-overlay").show();
        // Gửi yêu cầu để lấy chi tiết người dùng
        $.ajax({
            url: `http://localhost:3001/api/v1/hotels/getDetailHotel/${id}`,
            method: "GET",
            success: function (data) {
                console.log("2");
                console.log(data);
                $(".popup-overlay").html(`
          <div class="popup"> 
          <span class="close-btn">&times;</span> 
          <h2>Chỉnh sửa</h2> 
          <form id="updateForm"> 
              <input type="text" id="name" name="name" placeholder="Tên khách sạn" value="${data.name}" required>
              <input type="text" id="rate" name="rate" placeholder="Đánh giá" value="${data.rate}" required> 
              <input type="text" id="userRating" name="userRating" placeholder="Người dùng đánh giá"
                 value="${data.userRating}" required> 
              <input type="text" id="map" name="map" placeholder="Địa chỉ" value="${data.map}" required> 
              <input type="text" id="roomType" name="roomType" placeholder="Loại phòng" value="${data.roomType}"
                 required> 
              <input type="text" id="TypeHotel" name="TypeHotel" placeholder="Loại khách sạn" value="${data.TypeHotel}"
                 required>    
              <input type="text" id="status" name="status" placeholder="Trạng thái" value="${data.status}"
                 required> 
              <input type="text" id="cost" name="cost" placeholder="Giá" value="${data.cost}" required> 
              <input type="text" id="type" name="type" placeholder="Loại" value="${data.type}" required> 
              <input type="text" id="payment" name="payment" placeholder="Phương thức thanh toán" value="${data.payment}"
                 required> 
              <div class="ebutton"> 
                  <input type="submit" value="Cập nhật"> 
                  </div> 
              </form> 
          </div> `);

                $(".ebutton").click(function () {
                    console.log(id);
                    const name = $("#name").val();
                    const rate = $("#rate").val();
                    const map = $("#map").val();
                    const roomType = $("#roomType").val();
                    const TypeHotel = $("#TypeHotel").val();
                    const status = $("#status").val();
                    const cost = $("#cost").val();
                    const type = $("#type").val();
                    const payment = $("#payment").val();

                    $.ajax({
                        url: `http://localhost:3001/api/v1/hotels/updateHotel/${id}`,
                        method: "PUT",
                        data: {
                            name,
                            rate,
                            map,
                            roomType,
                            TypeHotel,
                            status,
                            cost,
                            type,
                            payment,
                        },
                        success: function (data) {
                            renderPage();
                            console.log("Chỉnh sửa khách sạn thành công");
                        },
                        error: function (error) {
                            console.log("Lỗi khi chỉnh sửa khách sạn", error);
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
