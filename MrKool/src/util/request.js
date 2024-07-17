
let requests = [
    {
        requestID: 4,
        date: "11/07/2024",
        description: "Gặp sự cố khi sử dụng máy lạnh, cần kiểm tra và sửa chữa",
        requestAddress: "41/24 quận 7",
        status: 0,
        model: [
            {
                "conditionerModelID": 1,
                "title": "CS-RU18AKH-8",
                "price": 500000,
                "image": "https://www.google.com/imgres?q=m%C3%A1y%20l%E1%BA%A1nh&imgurl=https%3A%2F%2Fdienmaythiennamhoa.vn%2Fstatic%2Fimages%2FM%25C3%25A1y%2520l%25E1%25BA%25A1nh%2520MITSUBISHI%2520HEAVY%2520SRK10YYP-W5SRC10YYP-W5-5.jpg&imgrefurl=https%3A%2F%2Fdienmaythiennamhoa.vn%2Fmay-lanh%2Fmay-lanh-mitsubishi-inverter-heavy-srk10yyp-w5src10yyp-w5-258516.html&docid=Hm3PVxREGuHenM&tbnid=RNFa0RHeK4MlXM&vet=12ahUKEwiu4I-C6q2HAxUzsVYBHRNJEZoQM3oECBkQAA..i&w=800&h=500&hcb=2&ved=2ahUKEwiu4I-C6q2HAxUzsVYBHRNJEZoQM3oECBkQAA",
            }
        ],
        areaID: 456,
        customer: [
            {
                "customerID": 1,
                "email": "customer1@gmail.com",
                "address": "",
                "password": "123456",
                "telephone": "0908290671",
                "customerName": "Customer 1"
            }
        ],
        stationID: 321,
        services: [
            { serviceID: 1, title: "Vệ sinh lại toàn bộ ", price: 500000 },
            { serviceID: 2, title: "bảo trì lại toàn bộ ", price: 300000 }
        ]
    },
    {
        requestID: 2,
        date: "2024-07-16",
        description: "Cần lắp đặt mới máy điều hòa tại văn phòng",
        requestAddress: "456 XYZ Street, ABC City",
        status: 0,
        conditionerModelID: 456,
        areaID: 789,
        customerID: 321,
        stationID: 654,
        services: [
            { serviceID: 2, title: "Lắp đặt mới máy điều hòa", price: 200, description: "Dịch vụ lắp đặt mới máy điều hòa tại văn phòng" }
        ]
    },
    {
        requestID: 3,
        date: "2024-07-15",
        description: "Cần sửa chữa máy lạnh tại nhà riêng",
        requestAddress: "789 CDE Street, PQR City",
        status: 1,
        conditionerModelID: 789,
        areaID: 123,
        customerID: 654,
        stationID: 987,
        services: [
            { serviceID: 3, title: "Sửa chữa máy lạnh", price: 150, description: "Dịch vụ sửa chữa máy lạnh tại nhà riêng" }
        ]
    },
];

// Lấy danh sách request
export const getRequest = async () => {
    await delay(500); // Giả lập delay như trong thực tế
    return { $values: requests };
};

// Cập nhật trạng thái của request khi được approve bởi manager
export const approveByManager = async (requestID, data) => {
    const updatedRequests = requests.map(req => {
        if (req.requestID === requestID) {
            return { ...req, status: 'Approved' };
        }
        return req;
    });

    await delay(500); // Giả lập delay như trong thực tế
    return { data: updatedRequests.find(req => req.requestID === requestID) };
};

// Tạo mới request
export const createRequest = async (newRequest) => {
    const createdRequest = {
        ...newRequest,
        requestID: requests.length + 1, // Tạo ID mới cho request
        status: 'Pending', // Mặc định là Pending khi tạo mới
    };

    requests.push(createdRequest);

    await delay(500); // Giả lập delay như trong thực tế
    return { data: createdRequest };
};

// Hàm giả lập delay
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
