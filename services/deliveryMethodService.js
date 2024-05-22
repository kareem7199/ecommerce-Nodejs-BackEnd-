import DeliveryMethod from '../models/DeliveryMethod.js';

const createDeliveryMethod = deliveryMethod => DeliveryMethod.create(deliveryMethod);

const getDeliveryMethod = id => DeliveryMethod.findById(id);

const getDeliveryMethods = () => DeliveryMethod.find();

const updateDeliveryMethod = (id, deliveryMethod) => DeliveryMethod.findByIdAndUpdate(id, deliveryMethod, { new: true });

export default {
    createDeliveryMethod,
    getDeliveryMethod,
    getDeliveryMethods,
    updateDeliveryMethod
}