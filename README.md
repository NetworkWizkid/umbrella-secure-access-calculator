# Cisco Umbrella & Secure Access Seat Calculator

## 📌 Overview
The **Cisco Umbrella & Secure Access Seat Calculator** is a powerful tool designed to help organizations determine the number of seats required for **Cisco Umbrella** and **Cisco Secure Access** deployments. It accounts for:

- **Subscription tiers**
- **DNS queries**
- **Enterprise Agreements (EA)**
- **Secure Internet Gateway (SIG) usage**
- **Secure Access subscriptions**

---

## 🚀 Features
- ✅ Calculate **total seats required** for Cisco Umbrella and Cisco Secure Access
- ✅ Adjust seats based on **average DNS queries per user**
- ✅ Compute **SIG usage** using **peak bandwidth** requirements
- ✅ Identify **under- or over-utilization** of resources
- ✅ Support **K-12 and Higher Education** licensing models
- ✅ Calculate **Secure Access seats** for DNS Defense, SIA, and SPA
- ✅ Compare **Umbrella SIG utilization** vs. **Secure Access utilization**
- ✅ Export results as a **PDF file** for easy sharing

---

## 🛠 Usage Instructions

### New Deployment Calculation
1. Set **Average DNS Queries Per Day, Per User** to `5,000`.
2. Enter the **number of users** in the relevant fields.
3. Specify if the subscription is part of an **Enterprise Agreement (EA)**.

### Existing Deployment Analysis
1. Enter the **number of existing users**.
2. Input the **current DNS Queries Per Day, Per User**.
3. Select **EA status** (`Yes` or `No`).
4. Check the **Utilization field** to identify **over- or underuse** based on a `5,000 DNS query allowance per user`.

### SIG Usage Calculation
1. Enter the **required number of seats**.
2. Input the **estimated Peak Bandwidth Per Month, Per User**.
3. View the **SIG Average Bandwidth per user** (kbps/day).
4. Review the automatically calculated **SIG Utilization**.
5. If **SIG usage exceeds 100%**, the **Additional SIG Users Required** field will populate.

### Compare Secure Access Against Umbrella
1. Enter **Umbrella SIG information**, including existing or required seats.
2. Select `Yes` for **"Would you like to compare Secure Access with Umbrella or calculate Secure Access seats?"**.
3. Choose a **single DNS subscription** or up to **one SIA and one SPA subscription**.
4. For SIA or SPA, enter the **number of users** for each subscription.
5. Keep **Secure Access Peak Bandwidth Per Month, Per User** at `20GB` unless users exceed this monthly.
6. Review the calculated **Secure Access Utilization**.

### Calculate Secure Access DNS Defense Seats
1. Enter the **number of users** in the **Number of Employees** field and, optionally, **K-12** or **Higher Education** fields.
2. Set **Average DNS Queries Per Day, Per User** (default: `5,000`).
3. Select `Yes` for **"Would you like to compare Secure Access with Umbrella or calculate Secure Access seats?"**.
4. Choose **DNS Defense Essentials** or **DNS Defense Advantage**.
5. View the calculated **Total Seats Required**.

### Calculate Secure Access Private Access or Secure Internet Access Seats
1. Select `Yes` for **"Would you like to compare Secure Access with Umbrella or calculate Secure Access seats?"**.
2. Choose a **Secure Access Subscription Tier** (`Secure Internet Access Essentials/Advantage` or `Secure Private Access Essentials/Advantage`). For both SIA and SPA, select one of each.
3. Enter the **number of users** for each subscription tier.
4. Set **Secure Access Peak Bandwidth Per Month, Per User** (default: `20GB`).
5. View the calculated **Total Seats Required**.

---

## ℹ️ Important Notes
- ⚠️ **K-12 and Higher Education fields** cannot both be populated—choose one!
- ⚠️ Per Cisco's Umbrella DNS MSLA, each user is allowed **5,000 DNS requests per day** (150,000 per month).
- ⚠️ Per Cisco's Umbrella SIG MSLA, each user is allowed **50 kbps** (1,500 kbps per month).
- ⚠️ **DNS Essentials and Advantage** subscriptions count students differently:
  - **K-12 students**: 1 user license per **10 students**
  - **Higher Education students**: 1 user license per **5 students**

🔗 **Learn more about Cisco Umbrella licensing**:  
[How to Determine the Number of Cisco Umbrella Seats Required](https://networkwizkid.com/2024/03/07/how-to-determine-the-number-of-cisco-umbrella-seats-required/)

---

## 💡 Example Scenarios

### Scenario 1: Enterprise with 3,000 Employees
- **Subscription Tier**: `DNS Essentials`
- **Employees**: `3,000`
- **EA Subscription**: `No`
- **Anticipated DNS Queries Per User**: `3,400`
- ✅ **Total Seats Required**: `3,000`

### Scenario 2: K-12 School with 150 Employees & 1,000 Students
- **Subscription Tier**: `DNS Advantage`
- **Employees**: `150`
- **K-12 Students**: `1,000`
- ✅ **Total Seats Required**: `250 user licenses`  
  - Calculation: `(150 Employees + (1,000 Students / 10)) = 250`

### Scenario 3: Higher Education Facility with 565 Employees & 5,400 Students
- **Subscription Tier**: `DNS Advantage`
- **Employees**: `565`
- **Higher Education Students**: `5,400`
- ✅ **Total Seats Required**: `1,645 user licenses`  
  - Calculation: `(565 Employees + (5,400 Students / 5)) = 1,645`

### Scenario 4: Secure Access Deployment with 6,758 Users (Over-Utilized Umbrella)
- **Existing Umbrella Subscription Tier**: `SIG Essentials`
- **Existing Umbrella Seats**: `6,758`
- **SIG Peak Bandwidth Per Month, Per User**: `2,636.40 kbps`
- **Secure Access Subscription Tier**: `Secure Internet Access Essentials` and `Secure Private Access Essentials`
- **SPA Users**: `3,000`
- **SIA Users**: `3,758`
- **Secure Access Peak Bandwidth Per Month, Per User**: `20GB`
- ✅ **Result**: Umbrella SIG Utilization is `175.73%`, requiring an additional `5,118 seats`. Secure Access Utilization is `0.01%` with the same traffic, making it the better option.

### Scenario 5: Secure Access Deployment with 6,758 Users Exceeding 20GB Bandwidth
- **Existing Secure Access Subscription Tier**: `Secure Internet Access Essentials` and `Secure Private Access Essentials`
- **Existing Secure Access Seats**: `6,758`
- **Secure Access Peak Bandwidth Per Month, Per User**: `30GB`
- ✅ **Result**: Secure Access Utilization exceeds `20GB`, requiring an additional `3,379 seats`, totaling `10,137 seats`.

---

## 📚 Useful Guides
Explore these resources for more information on Cisco Umbrella and Secure Access deployments:
- <a href="https://docs.sse.cisco.com/sse-dns-guide/docs/monthly-dns-query-average" target="_blank">Secure Access DNS Query Average</a>: Learn about average DNS query volumes for Secure Access.
- <a href="https://www.cisco.com/c/dam/en_us/about/doing_business/legal/OfferDescriptions/Cisco-Secure-Access-Product-Description.pdf" target="_blank">Secure Access MSLA</a>: Master Service Level Agreement for Cisco Secure Access.
- <a href="https://www.cisco.com/c/dam/en_us/about/doing_business/legal/msla/sig-essentials.pdf" target="_blank">Umbrella SIG MSLA</a>: Service Level Agreement for Umbrella SIG Essentials.
- <a href="https://www.cisco.com/c/dam/en_us/about/doing_business/legal/msla_direct/dns-security.pdf" target="_blank">Umbrella DNS MSLA</a>: Service Level Agreement for Umbrella DNS Security.
- <a href="https://www.networkwizkid.com" target="_blank">Network Wizkid</a>: Visit Network Wizkid’s website for more networking and cyber security resources.
- <a href="https://www.youtube.com/@networkwizkid" target="_blank">Network Wizkid YouTube</a>: Visit Network Wizkid’s YouTube channel for more networking and cyber security resources.
- <a href="https://www.cisco.com/c/en/us/solutions/collateral/security-service-edge-sse/security-service-edge-sse-package-og.html" target="_blank">Cisco SSE Packages</a>: Overview of Cisco Security Service Edge (SSE) packages.
- <a href="https://networkwizkid.com/2024/03/07/how-to-determine-the-number-of-cisco-umbrella-seats-required/" target="_blank">How to Determine the Number of Seats Required</a>: Guide on calculating Cisco Umbrella seat requirements.
- <a href="https://www.cisco.com/c/en/us/products/collateral/security/secure-access/secure-access-dns-defense-ds.html" target="_blank">Cisco Secure Access - DNS Defense Data Sheet</a>: Cisco Secure Access - DNS Defense (Formerly Cisco Umbrella DNS) Data Sheet.
- <a href="https://www.cisco.com/c/en/us/products/collateral/security/secure-access/hybrid-workforce-cloud-agile-security-ds.html" target="_blank">Cisco Secure Access Data Sheet</a>: Cisco Secure Access Data Sheet.

---

## 🖥️ Technical Details
- **Frontend**: HTML, CSS (`styles.css`), JavaScript (`ucjs.js`)
- **Libraries**: `jsPDF` and `html2canvas` for PDF generation
- **Styling**: Clean, modern design with print-friendly styles for PDF export (see `styles.css`)
- **Compatibility**: Works in modern browsers (e.g., Chrome, Edge, Firefox)

---

## 📄 License
This project is provided for educational and professional use. Contact networkwiizkiid@gmail.com for any inquiries or contributions.

---