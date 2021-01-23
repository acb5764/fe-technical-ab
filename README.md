Hello!

npm install && npm start 
should get you up and running.

deployed at Chiraba.com or http://172.104.27.215/ otherwise.

In total, this took me ~9 hours of work/study to complete. I had to refresh on a few things like react hooks and styles. Would have liked to include Unit Tests and accessability, but I have never used Test Driven Development or added accessability features to a website before. I would love to learn how in the future!

Tradeoffs: 
1: The data served is terrible. I wrote a function in Home.jsx (lines 75-83, called by 99-105) to handle the data, but it is computationally expensive and would not scale well in larger datasets. I tried to find a better solution, but I was not able to do so. If you had any better ideas, I would love to learn.
2: Used an overlayed component to display details rather than another "page" like listed in the assignment. Admittadely I could spend more time on the details component, but it works okay. Left my initial routes for future expandability. 


Sidebar was created from scratch using this as reference: https://w3collective.com/react-sidebar-navigation-component/

Table is Material-UI, using: https://material-ui.com/components/tables/

Fonts/icons are available in many packages, but I chose react-icons from: https://react-icons.github.io/react-icons/
As this package allows for future expansion of icon diversity without bloating the client.

b.well icons taken from the b.well website. i.e. favicon, and logo.





