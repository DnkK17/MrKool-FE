
import axiosClient from "./axios"
const api = {
    login: (params) => {
        const url = "api/Auth/login";
        return axiosClient.post(url, params);
    },
    register: (params) => {
        const url = "api/Auth/register";
        return axiosClient.post(url, params);
    },
    //AREA 
    getArea: () => {
        const url = "Area/Areas";
        return axiosClient.get(url);
    },
    getAreaById: (id) => {
        const url = `Area/${id}`;
        return axiosClient.get(url);
    },
    searchArea: (keyword) => {
        const url = `Area/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateArea: (id, data) => {
        const url = `Area/UpdateArea/${id}`;
        return axiosClient.put(url, data);
    },
    createPackage: (params) => {
        const url = "Area/CreateArea";
        return axiosClient.post(url, params);
    },
    deleteArea: (id) => {
        const url = `Area/DeleteArea/${id}`;
        return axiosClient.delete(url);
    },
    // CUSTOMER
    getCustomer: () => {
        const url = "Customer/Customers";
        return axiosClient.get(url);
    },
    getCustomerById: (id) => {
        const url = `Customer/${id}`;
        return axiosClient.get(url);
    },
    searchCustomer: (keyword) => {
        const url = `Customer/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateCustomer: (id, data) => {
        const url = `Customer/UpdateCustomer/${id}`;
        return axiosClient.put(url, data);
    },
    createCustomer: (params) => {
        const url = "Customer/CreateCustomer";
        return axiosClient.post(url, params);
    },
    deleteCustomer: (id) => {
        const url = `Customer/DeleteCustomer/${id}`;
        return axiosClient.delete(url);
    },
    //FIX HISTORY
    getFixHistory: () => {
        const url = "FixHistory/FixHistories";
        return axiosClient.get(url);
    },
    getFixHistoryById: (id) => {
        const url = `FixHistory/${id}`;
        return axiosClient.get(url);
    },
    updateFixHistory: (id, data) => {
        const url = `FixHistory/UpdateFixHistory/${id}`;
        return axiosClient.put(url, data);
    },
    createFixHistory: (params) => {
        const url = "FixHistory/CreateFixHistory";
        return axiosClient.post(url, params);
    },
    deleteFixHistory: (id) => {
        const url = `FixHistory/DeleteFixHistory/${id}`;
        return axiosClient.delete(url);
    },
    //MANAGER
    getManagerById: (id) => {
        const url = `Manager/${id}`;
        return axiosClient.get(url);
    },
    searchManager: (keyword) => {
        const url = `Managers/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateManager: (id, data) => {
        const url = `Manager/UpdateManager/${id}`;
        return axiosClient.put(url, data);
    },
    createManager: (params) => {
        const url = "Manager/CreateManager";
        return axiosClient.post(url, params);
    },
    deleteManager: (id) => {
        const url = `FixHistory/DeleteFixHistory/${id}`;
        return axiosClient.delete(url);
    },
    //MODEL
    getModel: () => {
        const url = "Model/";
        return axiosClient.get(url);
    },
    getModelById: (id) => {
        const url = `Model/${id}`;
        return axiosClient.get(url);
    },
    searchModel: (keyword) => {
        const url = `Model/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateModel: (id, data) => {
        const url = `Model/UpdateModel/${id}`;
        return axiosClient.put(url, data);
    },
    createModel: (params) => {
        const url = "Model/CreateModel";
        return axiosClient.post(url, params);
    },
    deleteModel: (id) => {
        const url = `Model/${id}`;
        console.log('API deleteModel called with ID:', id);
        return axiosClient.delete(url);
    },
    //ORDER
    getOrder: () => {
        const url = "Order/Orders";
        return axiosClient.get(url);
    },
    getOrderById: (id) => {
        const url = `Order/${id}`;
        return axiosClient.get(url);
    },
    searchOrder: (keyword) => {
        const url = `Order/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateOrder: (id, data) => {
        const url = `Order/UpdateOrder/${id}`;
        return axiosClient.put(url, data);
    },
    createOrder: (params) => {
        const url = "Order/CreateOrder";
        return axiosClient.post(url, params);
    },
    deleteOrder: (id) => {
        const url = `Order/DeleteOrder/${id}`;
        return axiosClient.delete(url);
    },
    updateOrderStatus: (id, data) => {
        const url = `Order/techinician/complete/${id}`;
        return axiosClient.put(url, data);
    },
    //ORDER DETAIL
    getOrderDetail: () => {
        const url = "OrderDetail/OrderDetails";
        return axiosClient.get(url);
    },
    getOrderDetailById: (id) => {
        const url = `OrderDetail/${id}`;
        return axiosClient.get(url);
    },
    //REQUEST
    getRequest: () => {
        const url = "Request";
        return axiosClient.get(url);
    },
    createRequest: (param) => {
        const url = "Request";
        return axiosClient.post(url, param);
    },
    getRequestById: (id) => {
        const url = `Request/${id}`;
        return axiosClient.get(url);
    },
    approveByManager: (requestID, technicianID, data) => {
        const url = `approve/manager/${requestID}/${technicianID}`;
        return axiosClient.put(url, data);
    },
    approveByTechnician: (id, data) => {
        const url = `Request/${id}/approve/techinician`;
        return axiosClient.put(url, data);
    },
    //SERVICE 
     getService: () => {
        const url = "Service";
        return axiosClient.get(url);
    },
    getServiceById: (id) => {
        const url = `Service/${id}`;
        return axiosClient.get(url);
    },
    searchService: (keyword) => {
        const url = `Service/search/${keyword}`;
        return axiosClient.get(url);
    },
    //STATION
    getStation: () => {
        const url = "Station/";
        return axiosClient.get(url);
    },
    getStationById: (id) => {
        const url = `Station/${id}`;
        return axiosClient.get(url);
    },
    searchStation: (keyword) => {
        const url = `Station/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateStation: (id, data) => {
        const url = `Station/UpdateStation/${id}`;
        return axiosClient.put(url, data);
    },
    createStation: (params) => {
        const url = "Station/CreateStation";
        return axiosClient.post(url, params);
    },
    deleteStation: (id) => {
        const url = `Station/DeleteModel/${id}`;
        return axiosClient.delete(url);
    },
    //TECHNICIAN
    getTechinician: () => {
        const url = "Techinician/Techinicians";
        return axiosClient.get(url);
    },
    getTechinicianById: (id) => {
        const url = `Techinician/${id}`;
        return axiosClient.get(url);
    },
    searchTechinician: (keyword) => {
        const url = `Techinician/search/${keyword}`;
        return axiosClient.get(url);
    },
    updateTechinician: (id, data) => {
        const url = `Techinician/UpdateTechinician/${id}`;
        return axiosClient.put(url, data);
    },
    createTechinician: (params) => {
        const url = "Techinician/CreateTechinician";
        return axiosClient.post(url, params);
    },
    deleteTechinician: (id) => {
        const url = `Techinician/DeleteTechinician/${id}`;
        return axiosClient.delete(url);
    },
}

export default api;
