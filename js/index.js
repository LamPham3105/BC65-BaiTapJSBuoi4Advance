function PrintResult(idTag, result, bgResult){
    document.getElementById(idTag).innerHTML = result;
    document.getElementById(idTag).style.cssText = `background: ${bgResult}; color: white; padding: 20px; margin-top: 30px; width: 50%; `;
}

/*--------BÀI TẬP 1--------*/
/*
Bước 1: Xác định đầu vào
- Chọn ngày, tháng, năm
- Lấy day, month, year từ input đã chọn
- Ngày trước đó: datePrevious
- Ngày sau đó: dateAfter

Bước 2: Xác định bước xử lý
- Tìm ngày trước đó
   + daySubOne = day - 1
   + Nếu daySubOne = 0 thì trừ month đi 1. Nếu month = 0 trừ year đi 1. Tìm lại max day theo month, year
   + Nếu daySubOne != 0 thì lấy ngày đó
- Tìm ngày sau đó
   + dayPlusOne = day + 1
   + Nếu dayPlusOne > maxDayOnMonth thì cộng 1 cho month và gán day = 1. Nếu month > 12 cộng 1 cho year, gán lại month = 1
   + Nếu dayPlusOne <= maxDayOnMonth thì lấy ngày đó

Bước 3: In kết quả ra màn hình
*/

const LAST_MONTH = 12;

document.getElementById("hanldeFindDate").onclick = function() {
    var dateEnter = new Date(document.getElementById("dateEnter").value);
    var optionDay = document.getElementById("optionDay").value;

    var day = dateEnter.getDate();
    var month = dateEnter.getMonth() + 1;
    var year = dateEnter.getFullYear();

    var maxDayOnMonth = GetDay(month, year);

    if (maxDayOnMonth == 0 || optionDay == "NA") {
        var idTag = "dateResult";
        var result = "Ngày, tháng, năm không hợp lệ";
        var bgResult = "red";
        PrintResult(idTag, result, bgResult);
    }
    else {
        if (optionDay == "P"){
            GetPreviousDate(day, month, year);
        } 
        else if  (optionDay == "A"){
            GetAfterDate(day, month, year, maxDayOnMonth);
        }  
    }
}

function GetPreviousDate(day, month, year){
    var daySubOne = day - 1;
    var dateAfter, bgResult = "#35a22c";

    if (daySubOne == 0){
        month--;
        if (month == 0) {
            month = LAST_MONTH;
            year--;
        }
        
        day = GetDay(month, year);;
        if (day == 0){
            dateAfter = "Ngày tháng năm không hợp lệ";
            bgResult = "red";
        }
        else {
            dateAfter = `Ngày ${day} Tháng ${month} Năm ${year}`;
        }
    }
    else {
        dateAfter = `Ngày ${daySubOne} Tháng ${month} Năm ${year}`;
    }

    var idTag = "dateResult";
    PrintResult(idTag, dateAfter, bgResult);
}

function GetAfterDate(day, month, year, maxDayOnMonth){
    var dayPlusOne = day + 1;
    var datePrevious, bgResult = "#35a22c";

    if (dayPlusOne > maxDayOnMonth){
        day = 1;
        month++;
        if (month > LAST_MONTH){
            month = 1;
            year++;
        }

        datePrevious = `Ngày ${day} Tháng ${month} Năm ${year}`;
    }
    else {
        datePrevious = `Ngày ${dayPlusOne} Tháng ${month} Năm ${year}`;
    }

    var idTag = "dateResult";
    PrintResult(idTag, datePrevious, bgResult);
}

function IsLeapYear(year) {
    return (year % 4 == 0 && year % 100 != 0 && year % 400 != 0) || (year % 100 == 0 && year % 400 == 0);
}

function GetDay(month, year) {
    switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if (IsLeapYear(year))
                return 29;
            return 28;
        default:
            return 0;
    }
}

/*--------BÀI TẬP 2--------*/
/*
Bước 1: Xác định đầu vào
- Chọn tháng, năm
- Lấy month, year từ input đã chọn
- Ngày: day

Bước 2: Xác định bước xử lý
- Kiểm tra số tháng
  + Nếu tháng 1, 3, 5, 7, 8, 10, 12 sẽ có 30 ngày
  + Nếu tháng 4, 6, 9, 11 sẽ có 31 ngày
  + Nếu tháng 2
    * Nếu năm nhuận thì có 29 ngày
    * Nếu năm không nhuận thì 28 ngày

Bước 3: In kết quả ra màn hình
*/

document.getElementById("hanldeFindDay").onclick = function() {
    var monthEnter = new Date(document.getElementById("monthEnter").value);

    var month = monthEnter.getMonth() + 1;
    var year = monthEnter.getFullYear();

    var day = GetDay(month, year);

    var result, bgResult;
    if (day == 0){
        result = "Tháng, năm không hợp lệ";
        bgResult = "red";
    }
    else {
        result = `Tháng ${month} có ${day} ngày trong năm ${year}`;
        bgResult = "#35a22c";
    }

    var idTag = "dayResult";
    PrintResult(idTag, result, bgResult);
}

/*--------BÀI TẬP 3--------*/
/*
Bước 1: Xác định đầu vào
- Nhập vào số có 3 chữ số: numberRead
- Số hàng trăm: hundredNumber = Math.floor(numberRead / 100)
- Số hàng chục: tenNumber = Math.floor(numberRead % 100 / 10)
- Số hàng đơn vị: unitNumber = numberRead % 10
- Biến chứa kết quả đọc: resultRead

Bước 2: Xác định bước xử lý
- Nếu tenNumber = unitNumber = 0 => resultRead = Đọc số hàng trăm + "Trăm"

- Nếu tenNumber = 0 và unitNumber > 1 and unitNumber <= 9 => resultRead = Đọc số hàng trăm + "Trăm" + "lẻ" + Đọc số hàng đơn vị

- Nếu tenNumber = 1 
  + Nếu unitNumber = 0 => resultRead = Đọc số hàng trăm + "Trăm" + "mười"
  + Nếu unitNumber = 1 => resultRead = Đọc số hàng trăm + "mười một"
  + Nếu unitNumber = 5 => resultRead = Đọc số hàng trăm + "Trăm" + "mười lăm"
  + Nếu unitNumber > 0 và <= 9 => resultRead = Đọc số hàng trăm + "Trăm" + "mười" + Đọc số hàng đơn vị

- Nếu tenNumber >= 2 và <= 9 
  + Nếu unitNumber = 0 => resultRead = Đọc số hàng trăm + "Trăm" + Đọc số hàng chục + "mươi"
  + Nếu unitNumber = 1 => resultRead = Đọc số hàng trăm + "Trăm" + Đọc số hàng chục + "mốt"
  + Nếu unitNumber = 5 => resultRead = Đọc số hàng trăm + "Trăm" + Đọc số hàng chục + "lăm"
  + Nếu unitNumber > 0 và <= 9 => resultRead = Đọc số hàng trăm + "Trăm" + Đọc số hàng chục + "mươi" + Đọc số hàng đơn vị

Bước 3: In kết quả ra màn hình
*/

document.getElementById("hanldeReadNumber").onclick = function() {
    var numberRead = +document.getElementById("numberRead").value;
    var lenghtNumberRead = numberRead.toString().length;

    var idTag = "readNumberResult", resultRead, bgResult;
    if (numberRead == 0){
        resultRead = "Vui lòng nhập đúng";
        bgResult = "red";   
    }
    else if ((lenghtNumberRead != 3 && numberRead > 0) || (lenghtNumberRead != 4 && numberRead < 0)){
        resultRead = "Số đang nhập khống phải số có 3 chữ số";
        bgResult = "red";
    }
    else
    {
        var convertNumber = numberRead;
        if (numberRead < 0)
            convertNumber *= -1;

        var hundredNumber = Math.floor(convertNumber / 100);
        var tenNumber = Math.floor(convertNumber % 100 / 10);
        var unitNumber = convertNumber % 10;
  
        resultRead = ReadAllNumber(hundredNumber, tenNumber, unitNumber);

        if (numberRead < 0)
            resultRead = "Âm " + resultRead;

        bgResult = "#35a22c";
    }

    PrintResult(idTag, resultRead, bgResult);
}

function ReadAllNumber(hundredNumber, tenNumber, unitNumber){
    switch (tenNumber) {
        case 0:
            if (unitNumber == 0){
                return ReadOneNumber(hundredNumber) + " Trăm";
            }
            else {
                return ReadOneNumber(hundredNumber) + " Trăm" + " Lẻ" + " " + ReadOneNumber(unitNumber);
            }
        default:
            var isTenNumberMoreThanOne = tenNumber > 1;
            return ReadTenAndUnitNumber(hundredNumber, tenNumber, unitNumber, isTenNumberMoreThanOne);
    }
}

function ReadTenAndUnitNumber(hundredNumber, tenNumber, unitNumber, isTenNumberMoreThanOne){
    switch (unitNumber) {
        case 0:
            var tenUnitNumber = " Mười";
            if (isTenNumberMoreThanOne){
                tenUnitNumber = " " + ReadOneNumber(tenNumber) + " Mươi";
            }

            return ReadOneNumber(hundredNumber) + " Trăm" + tenUnitNumber;
        case 1:
            var tenUnitNumber = " Mười Một";
            if (isTenNumberMoreThanOne){
                tenUnitNumber = " " + ReadOneNumber(tenNumber) + " Mốt";
            }
    
            return ReadOneNumber(hundredNumber) + " Trăm" + tenUnitNumber;
        case 5:
            var tenUnitNumber = " Mười Lăm";
            if (isTenNumberMoreThanOne){
                tenUnitNumber = " " + ReadOneNumber(tenNumber) + " Lăm";
            }

            return ReadOneNumber(hundredNumber) + " Trăm" + tenUnitNumber;
        default:
            var tenUnitNumber = " Mười" + " " + ReadOneNumber(unitNumber);
            if (isTenNumberMoreThanOne){
                tenUnitNumber = " " + ReadOneNumber(tenNumber) + " Mươi" + " " + ReadOneNumber(unitNumber);
            }

            return ReadOneNumber(hundredNumber) + " Trăm" + tenUnitNumber;
    }
}

function ReadOneNumber(count){
    switch (count) {
        case 0:
            return "Không";
        case 1:
            return "Một";
        case 2:
            return "Hai";
        case 3:
            return "Ba";
        case 4:
            return "Bốn";
        case 5:
            return "Năm";
        case 6:
            return "Sáu";
        case 7:
            return "Bảy";
        case 8:
            return "Tám";
        case 9:
            return "Chín";
        default:
            return "NA";
    }
}

/*--------BÀI TẬP 4--------*/
/*
Bước 1: Xác định đầu vào
- Nhập tên sinh viên: personOne, personTwo, personThree
- Nhập tên trường: schoolName
- Nhập kinh độ: personOneLongitude, personTwoLongitude, personThreeLongitude, schoolLongitude
- Nhập vĩ độ: personOneLatitude, personTwoLatitude, personThreeLatitude, schoolLatitude
- Kết quả: distanceResult

Bước 2: Xác định bước xử lý
- Tìm khoảng cách từ sinh viên thứ nhất tới trường: distanceOne = Math.sqrt(Math.pow(schoolLongitude - personOneLongitude, 2) + Math.pow(schoolLatitude - personOneLatitude, 2))
- Tìm khoảng cách từ sinh viên thứ hai tới trường: distanceTwo = Math.sqrt(Math.pow(schoolLongitude - personTwoLongitude, 2) + Math.pow(schoolLatitude - personTwoLatitude, 2))
- Tìm khoảng cách từ sinh viên thứ ba tới trường: distanceThree = Math.sqrt(Math.pow(schoolLongitude - personThreeLongitude, 2) + Math.pow(schoolLatitude - personThreeLatitude, 2))
- Tìm khoảng cách ra nhất

Bước 3: In kết quả ra màn hình
*/

function removeElement(element, className){
    document.getElementById(className).removeChild(element);
}

function AddElement(element, className){
    document.getElementById(className).appendChild(element);
}

document.getElementById("hanldeDistance").onclick = function() {
    var personOne = document.getElementById("personOne").value;
    var personTwo = document.getElementById("personTwo").value;
    var personThree = document.getElementById("personThree").value;
    var schoolName = document.getElementById("schoolName").value;

    var idTag = "distanceResult";
    var distanceResult, bgResult = "red";

    if (personOne == ""){
        distanceResult = "Vui lòng nhập tên sinh viên thứ nhất"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personTwo == ""){
        distanceResult = "Vui lòng nhập tên sinh viên thứ hai"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personThree == ""){
        result = "Vui lòng nhập tên sinh viên thứ ba"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (schoolName == ""){
        distanceResult = "Vui lòng nhập tên trường"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }

    var personOneLongitude = +document.getElementById("personOneLongitude").value;
    var personTwoLongitude = +document.getElementById("personTwoLongitude").value;
    var personThreeLongitude = +document.getElementById("personThreeLongitude").value;
    var schoolLongitude = +document.getElementById("schoolLongitude").value;
    var personOneLatitude = +document.getElementById("personOneLatitude").value;
    var personTwoLatitude = +document.getElementById("personTwoLatitude").value;
    var personThreeLatitude = +document.getElementById("personThreeLatitude").value;
    var schoolLatitude = +document.getElementById("schoolLatitude").value;
    
    if (personOneLongitude == 0){
        distanceResult = "Vui lòng nhập kinh độ sinh viên thứ nhất"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personTwoLongitude == 0){
        distanceResult = "Vui lòng nhập kinh độ sinh viên thứ hai"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personThreeLongitude == 0){
        distanceResult = "Vui lòng nhập kinh độ sinh viên thứ ba"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (schoolLongitude == 0){
        distanceResult = "Vui lòng nhập kinh độ sinh viên thứ trường"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personOneLatitude == 0){
        distanceResult = "Vui lòng nhập vĩ độ sinh viên thứ nhất"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personTwoLatitude == 0){
        distanceResult = "Vui lòng nhập vĩ độ sinh viên thứ hai"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (personThreeLatitude == 0){
        distanceResult = "Vui lòng nhập vĩ độ sinh viên thứ ba"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }
    else if (schoolLatitude == 0){
        distanceResult = "Vui lòng nhập vĩ độ trường"
        PrintResult(idTag, distanceResult, bgResult);
        return;
    }

    var arrDistance = [], arrName = [];

    var distanceOne = Math.sqrt(Math.pow(schoolLongitude - personOneLongitude, 2) + Math.pow(schoolLatitude - personOneLatitude, 2));
    arrDistance.push(distanceOne);
    arrName.push(personOne);

    var distanceTwo = Math.sqrt(Math.pow(schoolLongitude - personTwoLongitude, 2) + Math.pow(schoolLatitude - personTwoLatitude, 2));
    arrDistance.push(distanceTwo);
    arrName.push(personTwo);

    var distanceThree = Math.sqrt(Math.pow(schoolLongitude - personThreeLongitude, 2) + Math.pow(schoolLatitude - personThreeLatitude, 2))
    arrDistance.push(distanceThree);
    arrName.push(personThree);

    var maxDistance = Number.MIN_VALUE;
    var person;

    for (let i = 0; i < arrDistance.length; i++) {
        if (arrDistance[i] > maxDistance){
            maxDistance = arrDistance[i];
            person = arrName[i];
        }
    }

    bgResult = "#35a22c";
    if (maxDistance == Number.MAX_VALUE){
        distanceResult = "Không có sinh viên nào xa trường";
    } else {
        distanceResult = `Sinh viên xa trường nhất ${person} với khoảng cách ${maxDistance}`;
    }

    PrintResult(idTag, distanceResult, bgResult);
}