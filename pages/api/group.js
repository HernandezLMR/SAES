export default async function handler(req, res) {
    try {
        const { grupoID } = req.query;

        const data = {
            id: grupoID,
        };
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}