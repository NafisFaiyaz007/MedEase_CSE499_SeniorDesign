# MedEase: A Blockchain-Based Electronic Health Record System

MedEase is a blockchain-powered Electronic Health Record (EHR) system that aims to revolutionize healthcare data management. By leveraging blockchain technology, MedEase ensures secure, efficient, and transparent handling of patient records, empowering patients and healthcare providers alike.
![MedEase Poster](./Documents/499%20thesis%20poster%20Blockchain%20based%20Electronic%20health%20record%20system.png)
## Features

- **Secure Data Management**: Uses blockchain to ensure data integrity and security.
- **Paperless Healthcare**: Digitized records reduce dependency on physical paperwork.
- **Patient Empowerment**: Patients have control over their data with enhanced transparency.
- **Streamlined Processes**: Facilitates seamless sharing of medical records between healthcare providers.
- **Scalability**: Designed to handle large-scale healthcare systems efficiently.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Blockchain**: Ethereum (or preferred blockchain platform)
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Smart Contracts**: Solidity
- **Design Framework**: Tailwind CSS

## Installation

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Metamask (or any Ethereum-compatible wallet)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/NafisFaiyaz007/MedEase_CSE499_SeniorDesign.git
   cd MedEase_CSE499_SeniorDesign
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   BLOCKCHAIN_NETWORK=your_blockchain_network_url
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Run the frontend:
   ```bash
   cd client
   npm install
   npm start
   ```

6. Access the application:
   Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **Patient Registration**: Patients can register and manage their profiles securely.
2. **Record Upload**: Upload medical records directly to the blockchain.
3. **Data Sharing**: Share records with healthcare providers seamlessly.
4. **Real-Time Updates**: Get real-time updates on record access and modifications.

## Project Structure

```
MedEase_CSE499_SeniorDesign/
├── client/               # Frontend code
├── server/               # Backend code
├── contracts/            # Smart contract code
├── models/               # Database models
├── routes/               # API routes
├── .env                  # Environment variables
├── package.json          # Dependency manager
└── README.md             # Project documentation
```

## Future Enhancements

- Integration with IoT devices for real-time health monitoring.
- Transition to energy-efficient consensus algorithms like Proof of Stake.
- Support for AI-driven health analytics.
- Implementation of advanced privacy-preserving techniques.

## Contributors

- **Chowdhury Nafis Faiyaz** ([NafisFaiyaz007](https://github.com/NafisFaiyaz007))
- **Ayman Ibne Hakim**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Mentors and professors at North South University.
- Open-source blockchain and healthcare communities for their inspiration and resources.

---

### Connect

For any queries, feedback, or contributions, feel free to reach out or open an issue on this repository. Let's build a better future for healthcare together!
