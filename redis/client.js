import redis from 'redis'

const client = redis.createClient();

const connect = async () => {
    await client.connect();
    console.log("redis connected")
}

export default {client , connect};