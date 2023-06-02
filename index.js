import pg from "pg";

export const handler = async (event) => {
  const rdsConfig = {
    host: process.env.RDS_HOST,
    user: process.env.RDS_USER,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
    port: process.env.RDS_PORT,
  };

  const client = new pg.Client(rdsConfig);

  try {
    await client.connect();
    console.log("Connected to RDS successfully");

    const column = `INSERT INTO main (name) VALUES ('${event.name}')`;

    const res = await client.query(column);
    console.log("Query result:", res.rows);

    return {
      statusCode: 200,
      body: JSON.stringify(res.rows),
    };
  } catch (error) {
    console.error("Error", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error" }),
    };
  } finally {
    await client.end();
  }
};
