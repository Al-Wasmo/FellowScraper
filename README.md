# FellowScraper
FellowScraper is a **beginner-friendly** automation scraping tool that uses **graph-based** flows to simplify the web scraping process.      
Instead of writing complex code or scripts, you can visually build scraping workflows like connecting puzzle pieces and FellowScraper will handle the rest.

website: https://fellow-scraper.vercel.app/



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


## Introduction

Traditional web scraping requires writing code, understanding HTML parsing, and handling complex logic. FellowScraper changes this by providing a visual interface where you can:

- **Drag and drop** nodes to build scraping workflows
- **Connect nodes** to create data pipelines
- **Preview results** in real-time
- **Save and reuse** scraping flows


## Current Features

### Node Types
- **Start Node** - Entry point for your scraping flow
- **End Node** - Termination point for your flow
- **Request Node** - Sends HTTP requests to URLs with caching support
- **Find Element Node** - Searches HTML for elements by ID, class, attributes, or name
- **Extract Attribute Node** - Extracts text content or specific attributes from elements

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

## How to Use

### Basic Workflow
1. **Start with a Start Node** - Every flow begins here
2. **Add a Request Node** - Enter a URL to scrape
3. **Add Find Element Nodes** - Search for specific HTML elements
4. **Add Extract Nodes** - Pull out the data you need
5. **End with an End Node** - Mark the completion of your flow
6. **Connect the nodes** - Create data flow by linking outputs to inputs
7. **Run the flow** - Press Ctrl+D or use the run button


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


## Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## License

MIT