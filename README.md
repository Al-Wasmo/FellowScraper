# FellowScraper
FellowScraper is a **beginner-friendly** automation scraping tool that uses **graph-based** flows to simplify the web scraping process.      
Instead of writing complex code or scripts, you can visually build scraping workflows like connecting puzzle pieces and FellowScraper will handle the rest.

website: https://fellow-scraper.vercel.app/      
youtube explaining the tool: https://www.youtube.com/watch?v=vBhiXmkCTxc


## Quick Start
- go the the website
- you need to run the websocket server by doing the **backend setup**
- go the site and test by running the example

#### Backend Setup
   ```bash
   git clone https://github.com/Al-Wasmo/FellowScraper.git
   cd FellowScraper
   cd backend
   pip install -r requirements.txt
   python main.py
   ```


## Current Features

### Node Types
- **Start Node** - Entry point for your scraping flow
- **End Node** - Termination point for your flow
- **Request Node** - Sends HTTP requests to URLs with caching support
- **Find Element Node** - Searches HTML for elements by ID, class, attributes, or name
- **Extract Attribute Node** - Extracts text content or specific attributes from elements
- and more coming :)


### Interface Features
- **Visual Flow Builder** - Drag, drop, and connect nodes using React Flow
- **Flexible Layout** - Resizable panels powered by React Mosaic
- **Real-time Preview** - See results as you build your flow
- **Persistent Storage** - Automatically saves your work in browser storage
- **Keyboard Shortcuts** - Quick actions for power users
- **Documentation** - Built-in help system


### Technical Capabilities
- **WebSocket Communication** - Real-time data streaming between frontend and backend
- **Response Caching** - Faster testing with cached HTTP responses
- **Content Type Detection** - Automatic JSON and HTML prettification
- **Element Preview** - Visual preview of matched HTML elements
- **Error Handling** - Clear feedback when things go wrong


## How to Run

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**




### Frontend Setup
   ```bash
   git clone https://github.com/Al-Wasmo/FellowScraper.git
   cd FellowScraper
   cd frontend
   npm install
   npm run dev
   ```

### Backend Setup
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```


after this, you can run flows from the frontend

### Node Configuration
- **Request Node**: Enter URL, toggle response caching
- **Find Element**: Choose filter type (ID, Class, Attribute, Name) and enter values
- **Extract Attribute**: Select what to extract (text content or specific attributes)

### Planned Features
- [ ] Add more nodes
- [ ] Export flows as Python scripts
- [ ] Support for POST/PUT/DELETE requests
- [ ] Custom headers and authentication
- [ ] JSON data processing nodes
- [ ] Loop and conditional nodes
- [ ] Data export (CSV, JSON)
- [ ] Flow templates and examples


### Current Limitations
- uses local storage so its limited to 5mb 
- bad error handling in the backend
- lacks automation, so add more noes
- ... and alot more


## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

MIT