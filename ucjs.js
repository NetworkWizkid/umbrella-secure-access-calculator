// Add event listeners for subscription, add_students, compare_secure_access, and all inputs/selects
document.getElementById("subscription").addEventListener("change", updateSubscription);
document.getElementById("add_students").addEventListener("change", toggleStudentFields);
document.getElementById("compare_secure_access").addEventListener("change", toggleSecureAccessFields);
document.querySelectorAll("input, select").forEach(el => el.addEventListener("input", updateSeats));

function toggleStudentFields() {
    let addStudents = document.getElementById("add_students").value;
    let studentFields = document.getElementById("student_fields");
    let k12Field = document.getElementById("k12_students");
    let higherEdField = document.getElementById("higher_ed_students");

    if (addStudents === "No" || document.getElementById("subscription").value === "dns_edu") {
        studentFields.style.display = "none";
        k12Field.value = "";
        higherEdField.value = "";
    } else {
        studentFields.style.display = "block";
    }
}

function toggleSecureAccessFields() {
    const compareSecureAccess = document.getElementById("compare_secure_access").value;
    const secureAccessFields = document.getElementById("secure_access_fields");
    const secureAccessSub1 = document.getElementById("secure_access_subscription_1");
    const secureAccessSub2 = document.getElementById("secure_access_subscription_2");
    const spaSeatCount = document.getElementById("spa_seat_count");
    const siaSeatCount = document.getElementById("sia_user_seat_count");
    const secureAccessPeakBandwidth = document.getElementById("secure_access_peak_bandwidth");
    const secureAccessNote = secureAccessFields.querySelector(".secure-access-note");

    if (compareSecureAccess === "no") {
        secureAccessFields.style.display = "none";
        secureAccessSub1.value = "select";
        secureAccessSub2.value = "select";
        secureAccessSub2.disabled = false;
        spaSeatCount.value = "";
        siaSeatCount.value = "";
        secureAccessPeakBandwidth.value = "";
        spaSeatCount.style.display = "none";
        siaSeatCount.style.display = "none";
        document.getElementById("secure_access_output").style.display = "none";
    } else {
        secureAccessFields.style.display = "block";
        // Ensure note is visible
        if (secureAccessNote) {
            secureAccessNote.style.display = "block";
        }
        secureAccessPeakBandwidth.value = secureAccessPeakBandwidth.value || "20"; // Set default
        updateSecureAccessSubscriptions();
    }
}

function updateSecureAccessSubscriptions() {
    let secureAccessSub1 = document.getElementById("secure_access_subscription_1");
    let secureAccessSub2 = document.getElementById("secure_access_subscription_2");
    let spaSeatCount = document.getElementById("spa_seat_count");
    let siaSeatCount = document.getElementById("sia_user_seat_count");

    // Get selected subscriptions
    let sub1Value = secureAccessSub1.value;
    let sub2Value = secureAccessSub2.value;

    // Reset seat count fields
    spaSeatCount.style.display = "none";
    siaSeatCount.style.display = "none";
    spaSeatCount.value = "";
    siaSeatCount.value = "";

    // Determine which subscriptions are selected
    let hasDNS = sub1Value.includes("dns_defense") || sub2Value.includes("dns_defense");
    let hasSIA = sub1Value.includes("sia") || sub2Value.includes("sia");
    let hasSPA = sub1Value.includes("spa") || sub2Value.includes("spa");

    // If a DNS subscription is selected, disable the second dropdown
    if (hasDNS) {
        secureAccessSub2.disabled = true;
        secureAccessSub2.value = "select";
    } else {
        secureAccessSub2.disabled = false;
    }

    // If SIA or SPA is selected, disable DNS options and clear DNS selections
    if (hasSIA || hasSPA) {
        Array.from(secureAccessSub1.options).forEach(option => {
            if (option.value.includes("dns_defense")) {
                option.disabled = true;
                if (sub1Value.includes("dns_defense")) {
                    secureAccessSub1.value = "select";
                    sub1Value = "select"; // Update local variable
                }
            } else {
                option.disabled = false;
            }
        });
        Array.from(secureAccessSub2.options).forEach(option => {
            if (option.value.includes("dns_defense")) {
                option.disabled = true;
                if (sub2Value.includes("dns_defense")) {
                    secureAccessSub2.value = "select";
                    sub2Value = "select"; // Update local variable
                }
            } else {
                option.disabled = false;
            }
        });
    } else {
        // Re-enable all options if no SIA/SPA selected
        Array.from(secureAccessSub1.options).forEach(option => option.disabled = false);
        Array.from(secureAccessSub2.options).forEach(option => option.disabled = false);
    }

    // Disable duplicate SIA/SPA options when second dropdown is enabled
    if (!hasDNS) {
        Array.from(secureAccessSub1.options).forEach(option => {
            if (option.value !== "select" && !option.disabled) {
                if (hasSIA && option.value.includes("sia") && !sub1Value.includes("sia")) {
                    option.disabled = true;
                } else if (hasSPA && option.value.includes("spa") && !sub1Value.includes("spa")) {
                    option.disabled = true;
                }
            }
        });
        Array.from(secureAccessSub2.options).forEach(option => {
            if (option.value !== "select" && !option.disabled) {
                if (hasSIA && option.value.includes("sia") && !sub2Value.includes("sia")) {
                    option.disabled = true;
                } else if (hasSPA && option.value.includes("spa") && !sub2Value.includes("spa")) {
                    option.disabled = true;
                }
            }
        });
    }

    // Show seat count fields based on selected subscriptions
    if (sub1Value.includes("spa") || sub2Value.includes("spa")) {
        spaSeatCount.style.display = "block";
    }
    if (sub1Value.includes("sia") || sub2Value.includes("sia")) {
        siaSeatCount.style.display = "block";
    }

    updateSeats();
}

function updateSubscription() {
    let subscription = document.getElementById("subscription").value;
    let studentFields = document.getElementById("student_fields");
    let k12Field = document.getElementById("k12_students");
    let higherEdField = document.getElementById("higher_ed_students");
    let sigPeakField = document.getElementById("sig_peak_bandwidth");
    let addStudents = document.getElementById("add_students").value;

    // Ensure users select a valid subscription tier before proceeding
    if (subscription === "select") {
        document.getElementById("umbrella_output").style.display = "none";
        return;
    }

    // Reset all input values when Subscription Tier changes
    document.querySelectorAll("input").forEach(el => el.value = "");
    document.getElementById("dns_queries").value = "5000"; // Default DNS Queries Per User
    document.getElementById("add_students").value = "No"; // Reset Add Students to No
    document.getElementById("compare_secure_access").value = "no"; // Reset Compare Secure Access
    document.getElementById("secure_access_subscription_1").value = "select";
    document.getElementById("secure_access_subscription_2").value = "select";
    document.getElementById("secure_access_subscription_2").disabled = false;
    document.getElementById("secure_access_peak_bandwidth").value = "20"; // Default Secure Access Bandwidth

    // Hide student fields for DNS for EDU or when Add Students is No
    studentFields.style.display = (subscription === "dns_edu" || addStudents === "No") ? "none" : "block";

    // Clear student fields when hidden
    if (subscription === "dns_edu" || addStudents === "No") {
        k12Field.value = "";
        higherEdField.value = "";
    }

    // Enable SIG Peak Bandwidth input only if the subscription tier contains "sig"
    sigPeakField.disabled = !subscription.includes("sig");

    // Disable "Average DNS Queries Per Day, Per User" for SIG subscription tiers
    document.getElementById("dns_queries").disabled = subscription.includes("sig");

    // Reset outputs
    document.getElementById("umbrella_output").innerHTML = "";
    document.getElementById("umbrella_output").style.display = "none";
    toggleSecureAccessFields(); // Update Secure Access fields
}

function calculateSeats() {
    let subscription = document.getElementById("subscription").value;

    // Prevent calculation if no valid tier is selected
    if (subscription === "select") {
        alert("Please select a valid subscription tier and enter the relevant values before calculating.");
        return;
    }

    updateSeats();
    document.getElementById("umbrella_output").style.display = "block";
}

function updateSeats() {
    let subscription = document.getElementById("subscription").value;

    // Prevent calculation until a valid subscription tier is selected
    if (subscription === "select") {
        document.getElementById("umbrella_output").innerHTML = "<b>Please select a valid subscription tier.</b>";
        document.getElementById("umbrella_output").style.display = "none";
        document.getElementById("secure_access_output").style.display = "none";
        return;
    }

    let employees = Number(document.getElementById("employees").value) || 0;
    let k12 = Number(document.getElementById("k12_students").value) || 0;
    let higherEd = Number(document.getElementById("higher_ed_students").value) || 0;
    let dnsQueries = Number(document.getElementById("dns_queries").value) || 0;
    let sigPeakBandwidth = Number(document.getElementById("sig_peak_bandwidth").value) || 1500;
    let ea = document.getElementById("ea").value;
    let compareSecureAccess = document.getElementById("compare_secure_access").value;
    let secureAccessSub1 = document.getElementById("secure_access_subscription_1").value;
    let secureAccessSub2 = document.getElementById("secure_access_subscription_2").value;
    let spaSeatCount = Number(document.getElementById("spa_seat_count").value) || 0;
    let siaSeatCount = Number(document.getElementById("sia_user_seat_count").value) || 0;
    let secureAccessPeakBandwidth = Number(document.getElementById("secure_access_peak_bandwidth").value) || 20;

    // Automatically disable the other student category field when one is populated
    if (k12 > 0) {
        document.getElementById("higher_ed_students").disabled = true;
    } else if (document.getElementById("add_students").value === "Yes" && subscription !== "dns_edu") {
        document.getElementById("higher_ed_students").disabled = false;
    }

    if (higherEd > 0) {
        document.getElementById("k12_students").disabled = true;
    } else if (document.getElementById("add_students").value === "Yes" && subscription !== "dns_edu") {
        document.getElementById("k12_students").disabled = false;
    }

    // Calculate Umbrella results
    let baseUsers = employees + k12 + higherEd;
    let additionalSeats = Math.ceil((baseUsers * dnsQueries) / 5000);
    let totalSeats = Math.max(baseUsers, additionalSeats);
    let allowedSeats = ea === "Yes" ? Math.ceil(totalSeats * 1.1) : totalSeats;
    let utilization = ((dnsQueries / 5000) * 100).toFixed(2); // DNS Utilization

    // SIG Usage Calculation
    let sigAverageBandwidth = subscription.includes("sig") ? (sigPeakBandwidth / 30).toFixed(2) : "";
    let sigUtilization = subscription.includes("sig") ? ((sigPeakBandwidth / 30) / 50 * 100).toFixed(2) : "";
    let additionalSigUsers = subscription.includes("sig") && parseFloat(sigUtilization) > 100
        ? Math.ceil((parseFloat(sigUtilization) - 100) * totalSeats / 100)
        : "";

    let existingSeats = employees + k12 + higherEd;

    let lowUtilizationSeats = "";
    if (subscription.startsWith("dns") && dnsQueries < 5000 && dnsQueries > 0) {
        let actualSeatsRequired = Math.ceil(baseUsers * (dnsQueries / 5000));
        lowUtilizationSeats = actualSeatsRequired;
    }

    let sigLowUtilizationSeats = "";
    if (subscription.includes("sig") && sigPeakBandwidth < 1500) {
        let actualSigSeatsRequired = Math.ceil(baseUsers * (sigPeakBandwidth / 1500));
        sigLowUtilizationSeats = actualSigSeatsRequired;
    }

    // Umbrella output
    document.getElementById("umbrella_output").innerHTML = `
    <b>Subscription Tier:</b> ${subscription.replace(/_/g, " ").toUpperCase()}<br>
    <b>Number of Existing Seats:</b> ${existingSeats}<br>
    ${!subscription.includes("sig") ? `<b>Total DNS Seats Required:</b> ${totalSeats}<br>` : ""}
    ${ea === "Yes" ? `<b>EA Allowed Seats:</b> ${allowedSeats}<br>` : ""}
    ${!subscription.includes("sig") ? `<b>DNS Utilization:</b> ${utilization}%<br>` : ""}
    ${subscription.includes("sig") ? `<b>SIG Average Bandwidth Per User:</b> ${sigAverageBandwidth} kbps/day<br>` : ""}
    ${subscription.includes("sig") ? `<b>SIG Utilization:</b> ${sigUtilization}%<br>` : ""}
    ${subscription.includes("sig") && additionalSigUsers ? `<b>Additional SIG Users Required:</b> ${additionalSigUsers}<br>` : ""}
    ${subscription.includes("sig") && !sigLowUtilizationSeats ? `<b>Total SIG Seat Count Required:</b> ${existingSeats + (additionalSigUsers || 0)}<br>` : ""}
    ${lowUtilizationSeats ? `<b>Total DNS Seats Required Based on Low Utilization:</b> ${lowUtilizationSeats}<br>` : ""}
    ${sigLowUtilizationSeats ? `<b>Total SIG Seats Required Based on Low Utilization:</b> ${sigLowUtilizationSeats}<br>` : ""}
    `;
    document.getElementById("umbrella_output").style.display = "block";

    // Secure Access calculations and output
    let secureAccessOutput = "";
    if (compareSecureAccess === "yes" && (secureAccessSub1 !== "select" || secureAccessSub2 !== "select")) {
        let secureAccessBaseUsers = baseUsers; // Use same base users (employees + students)
        let secureAccessTotalSeats = totalSeats;
        let secureAccessAllowedSeats = ea === "Yes" ? Math.ceil(secureAccessTotalSeats * 1.1) : secureAccessTotalSeats;
        let secureAccessUtilization = utilization;
        let secureAccessLowUtilizationSeats = lowUtilizationSeats;

        let secureAccessSigAverageBandwidth = "";
        let secureAccessSigUtilization = "";
        let secureAccessAdditionalSigUsers = "";
        let secureAccessSigLowUtilizationSeats = "";
        let secureAccessTotalDataLimit = 0;
        let secureAccessVsSigUtilization = "";

        // Handle DNS-based Secure Access subscriptions
        let dnsSubscriptions = [];
        let siaSubscriptions = [];
        let spaSubscriptions = [];
        [secureAccessSub1, secureAccessSub2].forEach(sub => {
            if (sub.includes("dns_defense") && sub !== "select") {
                dnsSubscriptions.push(sub);
            } else if (sub.includes("sia") && sub !== "select") {
                siaSubscriptions.push(sub);
            } else if (sub.includes("spa") && sub !== "select") {
                spaSubscriptions.push(sub);
            }
        });

        // DNS-based Secure Access results
        if (dnsSubscriptions.length > 0) {
            secureAccessOutput += dnsSubscriptions.map(sub => `
                <b>Secure Access Subscription Tier:</b> ${sub.replace(/_/g, " ").toUpperCase()}<br>
                <b>Number of Existing Umbrella Seats:</b> ${existingSeats}<br>
                <b>Total DNS Seats Required:</b> ${secureAccessTotalSeats}<br>
                ${ea === "Yes" ? `<b>EA Allowed Seats:</b> ${secureAccessAllowedSeats}<br>` : ""}
                <b>DNS Utilization:</b> ${secureAccessUtilization}%<br>
                ${secureAccessLowUtilizationSeats ? `<b>Total DNS Seats Required Based on Low Utilization:</b> ${secureAccessLowUtilizationSeats}<br>` : ""}
            `).join("<br>");
        }

        // SIA/SPA calculations (20GB per user per month = 0.6667GB/day)
        if (siaSubscriptions.length > 0 || spaSubscriptions.length > 0) {
            // Use provided seat counts for SIA/SPA
            let totalSecureAccessUsers = siaSeatCount + spaSeatCount;
            secureAccessTotalDataLimit = totalSecureAccessUsers * 20; // 20GB per user

            // Secure Access bandwidth calculations
            secureAccessSigAverageBandwidth = (secureAccessPeakBandwidth / 30).toFixed(2); // GB/day for display
            secureAccessSigUtilization = (secureAccessPeakBandwidth / 20 * 100).toFixed(2); // % of 20GB/month
            secureAccessAdditionalSigUsers = parseFloat(secureAccessSigUtilization) > 100
                ? Math.ceil((parseFloat(secureAccessSigUtilization) - 100) * totalSecureAccessUsers / 100)
                : 0; // Ensure numeric or 0
            secureAccessSigLowUtilizationSeats = secureAccessPeakBandwidth < 20
                ? Math.ceil(totalSecureAccessUsers * (secureAccessPeakBandwidth / 20))
                : 0; // Ensure numeric or 0

            // Secure Access vs. SIG Utilization (Percentage of Secure Access 20GB/month used by SIG bandwidth)
            let sigMonthlyBandwidthGB = sigAverageBandwidth ? (sigAverageBandwidth * 30 / 1000000) : 0; // kbps/day to GB/month (1GB = 1,000,000 kbps)
            secureAccessVsSigUtilization = (sigMonthlyBandwidthGB / 20 * 100).toFixed(2); // % of 20GB/month

            // Combine SIA and SPA subscription tiers
            let combinedTiers = [...siaSubscriptions, ...spaSubscriptions]
                .map(sub => sub.replace(/_/g, " ").toUpperCase())
                .join(", ");

            secureAccessOutput += `
                <b>Secure Access Subscription Tier:</b> ${combinedTiers}<br>
                <b>Number of Existing Umbrella Seats:</b> ${existingSeats}<br>
                ${spaSubscriptions.length > 0 ? `<b>SPA User Seat Count:</b> ${spaSeatCount}<br>` : ""}
                ${siaSubscriptions.length > 0 ? `<b>SIA User Seat Count:</b> ${siaSeatCount}<br>` : ""}
                <b>Secure Access Average Bandwidth Per User:</b> ${secureAccessSigAverageBandwidth} GB/day<br>
                <b>Secure Access Utilization:</b> ${secureAccessSigUtilization}%<br>
                ${secureAccessAdditionalSigUsers ? `<b>Additional Secure Access Users Required:</b> ${secureAccessAdditionalSigUsers}<br>` : ""}
                ${secureAccessSigLowUtilizationSeats ? `<b>Total Secure Access Seat Count Required Based on Low Utilization:</b> ${secureAccessSigLowUtilizationSeats}<br>` : `<b>Total Secure Access Seat Count Required:</b> ${totalSecureAccessUsers + Number(secureAccessAdditionalSigUsers)}<br>`}
                <b>Total Secure Access Data Limit:</b> ${secureAccessTotalDataLimit} GB/month<br>
                <b>Secure Access vs. SIG Utilization (Monthly):</b> ${secureAccessVsSigUtilization}%<br>
            `;
        }

        document.getElementById("secure_access_output").innerHTML = secureAccessOutput;
        document.getElementById("secure_access_output").style.display = "block";
    } else {
        document.getElementById("secure_access_output").innerHTML = "";
        document.getElementById("secure_access_output").style.display = "none";
    }
}

function exportResultsToPDF() {
    console.log("Export function triggered for Umbrella Calculator results");

    const umbrellaContainer = document.getElementById("umbrella_output");
    const secureAccessContainer = document.getElementById("secure_access_output");

    if ((!umbrellaContainer || umbrellaContainer.innerHTML.trim() === "") &&
        (!secureAccessContainer || secureAccessContainer.innerHTML.trim() === "")) {
        console.error("Error: No results available in umbrella_output or secure_access_output.");
        alert("No results available to export!");
        return;
    }

    try {
        // Create print container
        const printContainer = document.createElement("div");
        printContainer.className = "print-container";
        Object.assign(printContainer.style, {
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "12pt",
            color: "#000",
            padding: "15mm",
            background: "#fff",
            width: "210mm",
            boxSizing: "border-box"
        });

        // Clone main container
        const mainContainer = document.querySelector(".container");
        const clonedContainer = mainContainer.cloneNode(true);

        // Remove buttons from clone
        const buttons = clonedContainer.querySelectorAll(".no-print");
        buttons.forEach(button => button.remove());

        // Map select values to display text
        const selectDisplayMap = {
            "ea": {
                "No": "No",
                "Yes": "Yes"
            },
            "subscription": {
                "select": "Select Umbrella Tier",
                "dns_essentials": "DNS Essentials",
                "dns_advantage": "DNS Advantage",
                "sig_essentials": "SIG Essentials",
                "sig_advantage": "SIG Advantage",
                "dns_edu": "DNS for EDU"
            },
            "add_students": {
                "No": "No",
                "Yes": "Yes"
            },
            "compare_secure_access": {
                "no": "No",
                "yes": "Yes"
            },
            "secure_access_subscription_1": {
                "select": "Select Subscription",
                "dns_defense_essentials": "DNS Defense Essentials",
                "dns_defense_advantage": "DNS Defense Advantage",
                "sia_essentials": "Secure Internet Access Essentials",
                "sia_advantage": "Secure Internet Access Advantage",
                "spa_essentials": "Secure Private Access Essentials",
                "spa_advantage": "Secure Private Access Advantage"
            },
            "secure_access_subscription_2": {
                "select": "Select Subscription",
                "dns_defense_essentials": "DNS Defense Essentials",
                "dns_defense_advantage": "DNS Defense Advantage",
                "sia_essentials": "Secure Internet Access Essentials",
                "sia_advantage": "Secure Internet Access Advantage",
                "spa_essentials": "Secure Private Access Essentials",
                "spa_advantage": "Secure Private Access Advantage"
            }
        };

        // Update input and select values
        const inputs = clonedContainer.querySelectorAll("input, select");
        inputs.forEach(clonedField => {
            const originalField = document.getElementById(clonedField.id);
            if (originalField) {
                if (clonedField.tagName === "SELECT") {
                    const value = originalField.value;
                    const displayText = selectDisplayMap[clonedField.id]?.[value] || "";
                    clonedField.outerHTML = `<span>${displayText}</span>`;
                } else if (clonedField.tagName === "INPUT") {
                    clonedField.outerHTML = `<span>${originalField.value || ""}</span>`;
                }
            }
        });

        // Ensure dynamic fields are visible
        const dynamicFields = clonedContainer.querySelectorAll("[style*='display: none']");
        dynamicFields.forEach(field => {
            if (field.id === "student_fields" && document.getElementById("add_students").value === "Yes") {
                field.style.display = "block";
            }
            if (field.id === "secure_access_fields" && document.getElementById("compare_secure_access").value === "yes") {
                field.style.display = "block";
                // Ensure note is visible
                const note = field.querySelector(".secure-access-note");
                if (note) {
                    note.style.display = "block";
                    note.style.margin = "10px 0";
                }
                // Ensure h2 is visible
                const h2 = field.querySelector("h2");
                if (h2) {
                    h2.style.display = "block";
                    h2.style.margin = "20px 0 10px";
                }
            }
            if (field.id === "spa_seat_count" || field.id === "sia_user_seat_count") {
                const secureAccessSub1 = document.getElementById("secure_access_subscription_1").value;
                const secureAccessSub2 = document.getElementById("secure_access_subscription_2").value;
                if ((field.id === "spa_seat_count" && (secureAccessSub1.includes("spa") || secureAccessSub2.includes("spa"))) ||
                    (field.id === "sia_user_seat_count" && (secureAccessSub1.includes("sia") || secureAccessSub2.includes("sia")))) {
                    field.style.display = "block";
                }
            }
        });

        // Append cloned content
        printContainer.appendChild(clonedContainer);

        console.log("Print Container Content:", printContainer.innerHTML);

        // Append to DOM
        document.body.appendChild(printContainer);

        // Hide all other elements for printing
        const originalContent = document.querySelectorAll("body > *:not(.print-container)");
        originalContent.forEach(el => el.style.display = "none");

        // Trigger print
        window.print();

        // Cleanup
        originalContent.forEach(el => el.style.display = "");
        document.body.removeChild(printContainer);
    } catch (error) {
        console.error("Unexpected error during export:", error);
        alert("An unexpected error occurred during export. Please try again.");
        const originalContent = document.querySelectorAll("body > *:not(.print-container)");
        originalContent.forEach(el => el.style.display = "");
        if (document.body.contains(printContainer)) {
            document.body.removeChild(printContainer);
        }
    }
}