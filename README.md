# IndabaX Sudan 2025 - Registration Form

Here are the steps to connect the website with Google Sheet.



### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Rename it to "IndabaX Sudan 2025 - Registrations"
4. In the first row, add these headers:

```
Timestamp | Name | Email | Gender | Phone | Age | Country | CV | Occupation | University | Year | Field of Study | Employment Info | Importance Indaba | Events Attended | Share Information | Stable Internet | Have Laptop | VPN | Gatherly | Hear About Us | Comments | Data Structures | Python Programming | Linear Algebra | Statistics | Calculus | ML Knowledge | Tutor Experience
```

### Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Copy the contents from `googleSheetScript.txt` and paste it into the editor
4. Click **File → Save** (or Ctrl+S)
5. Name the project "IndabaX Form Handler"

### Step 3: Deploy the Apps Script

1. Click **Deploy → New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description:** "IndabaX Registration Form Handler"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
5. Click **Deploy**
6. Click **Authorize access** when prompted
7. Choose your Google account
8. Click **Advanced → Go to IndabaX Form Handler (unsafe)**
9. Click **Allow**
10. **Copy the Web App URL** - you'll need this!

The URL looks like:
```
https://script.google.com/macros/s/AKfycbx.../exec
```

### Step 4: Configure the Form

1. Open `assets/js/form-script.js`
2. Find this line at the top:
   ```javascript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with your Web App URL from Step 4


## 🔄 Updating the Google Apps Script

If you make changes to the Google Apps Script:

1. Go to **Extensions → Apps Script** in your Google Sheet
2. Make your changes
3. Click **Deploy → Manage deployments**
4. Click the pencil icon ✏️
5. Change **Version** to "New version"
6. Click **Deploy**

> ⚠️ The URL stays the same, no need to update it in your JavaScript file.

