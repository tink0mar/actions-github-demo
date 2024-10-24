import Fastify from 'fastify';
import { createIcecream } from './controllers/createIcecream/createIcecream';
import { deleteIcecream } from './controllers/deleteIcecream/deleteIcecream';
import { getAllIcecreams } from './controllers/getIcecreams/getIcecreams';
import { updateIcecream } from './controllers/updateIcecream/updateIcecream';

const fastify = Fastify();

// Define all routes

// Create ice cream
fastify.post('/icecreams', async (request, reply) => {
  const { name, flavor, price } = request.body as {
    name: string;
    flavor: string;
    price: number;
  };
  const icecream = await createIcecream({ name, flavor, price });
  return reply.send(icecream);
});

// Delete ice cream
fastify.delete('/icecreams/:id', async (request, reply) => {
  const { id } = request.params as { id: number };
  const result = await deleteIcecream({ id });
  return reply.send(result);
});

// Get all ice creams
fastify.get('/icecreams', async (request, reply) => {
  const icecreams = await getAllIcecreams();
  return reply.send(icecreams);
});

// Update ice cream
fastify.put('/icecreams/:id', async (request, reply) => {
  const { id } = request.params as { id: number };
  const { name, flavor, price } = request.body as {
    name: string;
    flavor: string;
    price: number;
  };
  const updatedIcecream = await updateIcecream({ id }, { name, flavor, price });
  return reply.send(updatedIcecream);
});

// Start the server
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server running at ${address}`);
});
