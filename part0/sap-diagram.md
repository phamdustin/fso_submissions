```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: status code: 200, HTML file
    deactivate server

    browser->>server: POST AJAX
    activate server
    server-->>browser: JSON data
    deactivate server

```
