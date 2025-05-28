// Add event listeners for subscription, add_students, compare_secure_access, and all inputs/selects
document.getElementById("subscription").addEventListener("change", updateSubscription);
document.getElementById("add_students").addEventListener("change", toggleStudentFields);
document.getElementById("compare_secure_access").addEventListener("change", toggleSecureAccessFields);
document.querySelectorAll("input, select").forEach(el => el.addEventListener("input", updateSeats));

function toggleStudentFields() {
    const addStudents = document.getElementById("add_students").value;
    const subscription = document.getElementById("subscription").value;
    const studentFields = document.getElementById("student_fields");

    if (addStudents === "Yes" && subscription !== "dns_edu") {
        studentFields.style.display = "block";
    } else {
        studentFields.style.display = "none";
        document.getElementById("k12_students").value = "";
        document.getElementById("higher_ed_students").value = "";
    }
}

function toggleSecureAccessFields() {
    const compareSecureAccess = document.getElementById("compare_secure_access").value;
    const secureAccessFields = document.getElementById("secure_access_fields");
    const secureAccessSub1 = document.getElementById("secure_access_subscription_1");
    const secureAccessSub2 = document.getElementById("secure_access_subscription_2");
    const spaSeatCount = document.getElementById("spa_seat_count_input");
    const siaSeatCount = document.getElementById("sia_user_seat_count_input");
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
        document.getElementById("spa_seat_count").style.display = "none";
        document.getElementById("sia_user_seat_count").style.display = "none";
        document.getElementById("secure_access_output").style.display = "none";
    } else {
        secureAccessFields.style.display = "block";
        if (secureAccessNote) {
            secureAccessNote.style.display = "block";
        }
        secureAccessPeakBandwidth.value = secureAccessPeakBandwidth.value || "20";
        updateSecureAccessSubscriptions();
    }
}

function updateSecureAccessSubscriptions() {
    const secureAccessSub1Select = document.getElementById("secure_access_subscription_1");
    const secureAccessSub2Select = document.getElementById("secure_access_subscription_2");
    const sub1Value = secureAccessSub1Select.value;
    const sub2Value = secureAccessSub2Select.value;
    const spaSeatCountDiv = document.getElementById("spa_seat_count");
    const siaSeatCountDiv = document.getElementById("sia_user_seat_count");
    const spaInput = document.getElementById("spa_seat_count_input");
    const siaInput = document.getElementById("sia_user_seat_count_input");

    // Determine which subscriptions are selected
    let hasDNS = sub1Value.includes("dns_defense") || sub2Value.includes("dns_defense");
    let hasSIA = sub1Value.includes("sia") || sub2Value.includes("sia");
    let hasSPA = sub1Value.includes("spa") || sub2Value.includes("spa");

    // Reset visibility of seat count divs
    spaSeatCountDiv.style.display = "none";
    siaSeatCountDiv.style.display = "none";

    // Show SPA seat count if SPA is selected
    if (hasSPA) {
        spaSeatCountDiv.style.display = "block";
        if (!spaInput.value) spaInput.value = "";
    }

    // Show SIA seat count if SIA is selected
    if (hasSIA) {
        siaSeatCountDiv.style.display = "block";
        if (!siaInput.value) siaInput.value = "";
    }

    // If a DNS subscription is selected, disable the second dropdown
    secureAccessSub2Select.disabled = false;
    if (hasDNS) {
        secureAccessSub2Select.disabled = true;
        secureAccessSub2Select.value = "select";
        spaSeatCountDiv.style.display = "none"; // Hide seat counts for DNS
        siaSeatCountDiv.style.display = "none";
    }

    // If SIA or SPA is selected, disable DNS options and clear DNS selections
    if (hasSIA || hasSPA) {
        Array.from(secureAccessSub1Select.options).forEach(option => {
            if (option.value.includes("dns_defense")) {
                option.disabled = true;
                if (sub1Value.includes("dns_defense")) {
                    secureAccessSub1Select.value = "select";
                }
            } else {
                option.disabled = false;
            }
        });
        Array.from(secureAccessSub2Select.options).forEach(option => {
            if (option.value.includes("dns_defense")) {
                option.disabled = true;
                if (sub2Value.includes("dns_defense")) {
                    secureAccessSub2Select.value = "select";
                }
            } else {
                option.disabled = false;
            }
        });
    } else {
        // Re-enable all options if no SIA/SPA selected
        Array.from(secureAccessSub1Select.options).forEach(option => option.disabled = false);
        Array.from(secureAccessSub2Select.options).forEach(option => option.disabled = false);
    }

    // Disable duplicate SIA/SPA options when second dropdown is enabled
    if (!hasDNS) {
        Array.from(secureAccessSub1Select.options).forEach(option => {
            if (option.value !== "select" && !option.disabled) {
                if (hasSIA && option.value.includes("sia") && !sub1Value.includes("sia")) {
                    option.disabled = true;
                } else if (hasSPA && option.value.includes("spa") && !sub1Value.includes("spa")) {
                    option.disabled = true;
                }
            }
        });
        Array.from(secureAccessSub2Select.options).forEach(option => {
            if (option.value !== "select" && !option.disabled) {
                if (hasSIA && option.value.includes("sia") && !sub2Value.includes("sia")) {
                    option.disabled = true;
                } else if (hasSPA && option.value.includes("spa") && !sub2Value.includes("spa")) {
                    option.disabled = true;
                }
            }
        });
    }
}

function getUserBand(seatCount) {
    if (seatCount >= 25000) return "25,000 or more";
    if (seatCount >= 10000) return "10,000 - 24,999";
    if (seatCount >= 5000) return "5,000 - 9,999";
    if (seatCount >= 1000) return "1,000 - 4,999";
    if (seatCount >= 100) return "100 - 999";
    return "Less than 100";
}

function updateSubscription() {
    const subscription = document.getElementById("subscription").value;
    const sigBandwidthInput = document.getElementById("sig_peak_bandwidth");
    const addStudents = document.getElementById("add_students").value;

    // Preserve current SIG bandwidth value or set default if empty
    const currentSigBandwidth = sigBandwidthInput.value ? Number(sigBandwidthInput.value) : 1500;

    // Enable SIG bandwidth only for SIG subscriptions
    if (subscription.includes("sig")) {
        sigBandwidthInput.disabled = false;
        sigBandwidthInput.value = currentSigBandwidth; // Retain current or default
    } else {
        sigBandwidthInput.disabled = true;
        sigBandwidthInput.value = currentSigBandwidth; // Retain current or default
    }

    // Handle student fields visibility
    if (addStudents === "Yes" && subscription !== "dns_edu") {
        document.getElementById("student_fields").style.display = "block";
    } else {
        document.getElementById("student_fields").style.display = "none";
        document.getElementById("k12_students").value = "";
        document.getElementById("higher_ed_students").value = "";
    }
}

function calculateSeats() {
    const compareSecureAccess = document.getElementById("compare_secure_access").value;
    const secureAccessSub1 = document.getElementById("secure_access_subscription_1").value;
    const secureAccessSub2 = document.getElementById("secure_access_subscription_2").value;

    // Ensure Secure Access subscriptions are updated
    if (compareSecureAccess === "yes") {
        updateSecureAccessSubscriptions();
    }

    // If Secure Access is enabled and has valid subscriptions, allow calculation
    if (compareSecureAccess === "yes" && (secureAccessSub1 !== "select" || secureAccessSub2 !== "select")) {
        updateSeats();
        document.getElementById("secure_access_output").style.display = "block";
        return;
    }

    // For Umbrella, require a valid subscription tier
    const subscription = document.getElementById("subscription").value;
    if (subscription === "select") {
        alert("Please select a valid Umbrella subscription tier or enable Secure Access with a valid subscription.");
        return;
    }

    updateSeats();
    document.getElementById("umbrella_output").style.display = "block";
}

function updateSeats() {
    const subscription = document.getElementById("subscription").value;
    const compareSecureAccess = document.getElementById("compare_secure_access").value;
    const secureAccessSub1 = document.getElementById("secure_access_subscription_1").value;
    const secureAccessSub2 = document.getElementById("secure_access_subscription_2").value;

    let employees = Number(document.getElementById("employees").value) || 0;
    let k12 = Number(document.getElementById("k12_students").value) || 0;
    let higherEd = Number(document.getElementById("higher_ed_students").value) || 0;
    let dnsQueries = Number(document.getElementById("dns_queries").value) || 0;
    let sigPeakBandwidth = Number(document.getElementById("sig_peak_bandwidth").value) || 1500;
    let ea = document.getElementById("ea").value;
    let spaSeatCount = document.getElementById("spa_seat_count").style.display === "block" ? Number(document.getElementById("spa_seat_count_input").value) || 0 : 0;
    let siaSeatCount = document.getElementById("sia_user_seat_count").style.display === "block" ? Number(document.getElementById("sia_user_seat_count_input").value) || 0 : 0;
    let secureAccessPeakBandwidth = Number(document.getElementById("secure_access_peak_bandwidth").value) || 20;

    // Adjust student counts for Umbrella DNS Essentials and Advantage only
    let umbrellaK12 = k12;
    let umbrellaHigherEd = higherEd;
    if ((subscription === "dns_essentials" || subscription === "dns_advantage") && (k12 > 0 || higherEd > 0)) {
        umbrellaK12 = k12 > 0 ? Math.ceil(k12 / 10) : 0; // 1 license per 10 K-12 students
        umbrellaHigherEd = higherEd > 0 ? Math.ceil(higherEd / 5) : 0; // 1 license per 5 Higher Ed students
    }

    // Automatically disable/enable student fields based on input values
    const k12Input = document.getElementById("k12_students");
    const higherEdInput = document.getElementById("higher_ed_students");
    if (k12 > 0) {
        higherEdInput.disabled = true;
    } else if (document.getElementById("add_students").value === "Yes" && subscription !== "dns_edu") {
        higherEdInput.disabled = false;
    }

    if (higherEd > 0) {
        k12Input.disabled = true;
    } else if (document.getElementById("add_students").value === "Yes" && subscription !== "dns_edu") {
        k12Input.disabled = false;
    }

    // Umbrella calculations (only if subscription is valid)
    let umbrellaOutput = "";
    if (subscription !== "select") {
        let baseUsers = employees + umbrellaK12 + umbrellaHigherEd;
        let additionalSeats = Math.ceil((baseUsers * dnsQueries) / 5000);
        let totalSeats = Math.max(baseUsers, additionalSeats);
        let allowedSeats = ea === "Yes" ? Math.ceil(totalSeats * 1.1) : totalSeats;
        let utilization = ((dnsQueries / 5000) * 100).toFixed(2); // DNS Utilization
        let additionalDNSUsers = !subscription.includes("sig") && parseFloat(utilization) > 100
            ? Math.ceil((parseFloat(utilization) - 100) * baseUsers / 100)
            : "";

        // SIG Usage Calculation
        let sigAverageBandwidth = subscription.includes("sig") ? (sigPeakBandwidth / 30).toFixed(2) : "";
        let sigUtilization = subscription.includes("sig") ? ((sigPeakBandwidth / 30) / 50 * 100).toFixed(2) : "";
        let additionalSigUsers = subscription.includes("sig") && parseFloat(sigUtilization) > 100
            ? Math.ceil((parseFloat(sigUtilization) - 100) * totalSeats / 100)
            : "";

        let existingSeats = employees + umbrellaK12 + umbrellaHigherEd;

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
        umbrellaOutput = `
            <b>Subscription Tier:</b> ${subscription.replace(/_/g, " ").toUpperCase()}<br>
            <b>Number of Existing Seats:</b> ${existingSeats}<br>
            ${!subscription.includes("sig") ? `<b>DNS Utilization:</b> ${utilization}%<br>` : ""}
            ${!subscription.includes("sig") && additionalDNSUsers ? `<b>Additional DNS Users Required:</b> ${additionalDNSUsers}<br>` : ""}
            ${subscription.includes("sig") ? `<b>SIG Average Bandwidth Per User:</b> ${sigAverageBandwidth} kbps/day<br>` : ""}
            ${subscription.includes("sig") ? `<b>SIG Utilization:</b> ${sigUtilization}%<br>` : ""}
            ${subscription.includes("sig") && additionalSigUsers ? `<b>Additional SIG Users Required:</b> ${additionalSigUsers}<br>` : ""}
            ${ea === "Yes" ? `<b>EA Allowed Seats:</b> ${allowedSeats}<br>` : ""}
            ${subscription.includes("sig") && sigLowUtilizationSeats ? `<div class="highlighted-box"><b>Total SIG Seats Required Based on Low Utilization:</b> ${sigLowUtilizationSeats}</div><br>` : ""}
            ${subscription.includes("sig") && !sigLowUtilizationSeats ? `<div class="highlighted-box"><b>Total SIG Seat Count Required:</b> ${existingSeats + (additionalSigUsers || 0)}</div><br>` : ""}
            ${!subscription.includes("sig") && lowUtilizationSeats ? `<div class="highlighted-box"><b>Total DNS Seats Required Based on Low Utilization:</b> ${lowUtilizationSeats}</div><br>` : ""}
            ${!subscription.includes("sig") && !lowUtilizationSeats ? `<div class="highlighted-box"><b>Total DNS Seats Required:</b> ${totalSeats}</div><br>` : ""}
        `;
        document.getElementById("umbrella_output").innerHTML = umbrellaOutput;
        document.getElementById("umbrella_output").style.display = "block";
    } else {
        document.getElementById("umbrella_output").innerHTML = "";
        document.getElementById("umbrella_output").style.display = "none";
    }

    // Secure Access calculations and output
    let secureAccessOutput = "";
    if (compareSecureAccess === "yes" && (secureAccessSub1 !== "select" || secureAccessSub2 !== "select")) {
        let secureAccessBaseUsers = employees + k12 + higherEd;
        let dnsSubscriptions = [];
        let siaSubscriptions = [];
        let spaSubscriptions = [];

        // Categorize subscriptions
        [secureAccessSub1, secureAccessSub2].forEach(sub => {
            if (sub.includes("dns_defense") && sub !== "select") {
                dnsSubscriptions.push(sub);
            } else if (sub.includes("sia") && sub !== "select") {
                siaSubscriptions.push(sub);
            } else if (sub.includes("spa") && sub !== "select") {
                spaSubscriptions.push(sub);
            }
        });

        // Determine entered seat count for User Band comparison
        let enteredSeatCount = dnsSubscriptions.length > 0 ? secureAccessBaseUsers : (siaSeatCount + spaSeatCount);
        let enteredUserBand = getUserBand(enteredSeatCount);

        // DNS-based Secure Access results
        if (dnsSubscriptions.length > 0) {
            let secureAccessTotalSeats = Math.max(secureAccessBaseUsers, Math.ceil((secureAccessBaseUsers * dnsQueries) / 5000));
            let secureAccessAllowedSeats = ea === "Yes" ? Math.ceil(secureAccessTotalSeats * 1.1) : 0;
            let secureAccessUtilization = ((dnsQueries / 5000) * 100).toFixed(2);
            let secureAccessAdditionalDNSUsers = parseFloat(secureAccessUtilization) > 100
                ? Math.ceil((parseFloat(secureAccessUtilization) - 100) * secureAccessBaseUsers / 100)
                : "";
            let secureAccessLowUtilizationSeats = (dnsQueries < 5000 && dnsQueries > 0)
                ? Math.ceil(secureAccessBaseUsers * (dnsQueries / 5000))
                : "";

            let userBand = secureAccessLowUtilizationSeats ? getUserBand(secureAccessLowUtilizationSeats) : getUserBand(secureAccessTotalSeats);
            let userBandWarning = enteredUserBand !== userBand
                ? `<span class="user-band-warning">(Changed from entered band: ${enteredUserBand})</span>`
                : "";

            secureAccessOutput += dnsSubscriptions.map(sub => `
                <b>Secure Access Subscription Tier:</b> ${sub.replace(/_/g, " ").toUpperCase()}<br>
                <b>Number of Existing Umbrella Seats:</b> ${secureAccessBaseUsers}<br>
                <b>DNS Utilization:</b> ${secureAccessUtilization}%<br>
                ${secureAccessAdditionalDNSUsers ? `<b>Additional DNS Users Required:</b> ${secureAccessAdditionalDNSUsers}<br>` : ""}
                ${ea === "Yes" ? `<b>EA Allowed Seats:</b> ${secureAccessAllowedSeats}<br>` : ""}
                <b>User Band:</b> ${userBand}${userBandWarning}<br>
                ${secureAccessLowUtilizationSeats ? `<div class="highlighted-box"><b>Total DNS Seats Required Based on Low Utilization:</b> ${secureAccessLowUtilizationSeats}</div><br>` : ""}
                ${!secureAccessLowUtilizationSeats ? `<div class="highlighted-box"><b>Total DNS Seats Required:</b> ${secureAccessTotalSeats}</div><br>` : ""}
            `).join("<br>");
        }

        // SIA/SPA calculations
        if (siaSubscriptions.length > 0 || spaSubscriptions.length > 0) {
            // Use provided seat counts for SIA/SPA
            let totalSecureAccessUsers = (siaSubscriptions.length > 0 ? siaSeatCount : 0) + (spaSubscriptions.length > 0 ? spaSeatCount : 0);
            let secureAccessTotalDataLimit = totalSecureAccessUsers * 20; // 20GB per user

            // Secure Access bandwidth calculations
            let secureAccessSigAverageBandwidth = (secureAccessPeakBandwidth / 30).toFixed(2); // GB/day
            let secureAccessSigUtilization = (secureAccessPeakBandwidth / 20 * 100).toFixed(2); // % of 20GB/month
            let secureAccessAdditionalSigUsers = parseFloat(secureAccessSigUtilization) > 100
                ? Math.ceil((parseFloat(secureAccessSigUtilization) - 100) * totalSecureAccessUsers / 100)
                : 0;
            let secureAccessSigLowUtilizationSeats = secureAccessPeakBandwidth < 20
                ? Math.ceil(totalSecureAccessUsers * (secureAccessPeakBandwidth / 20))
                : 0;

            // Secure Access vs. SIG Utilization
            let sigMonthlyBandwidthGB = sigPeakBandwidth ? (sigPeakBandwidth / 1000000) : 0; // kbps/month to GB/month
            let secureAccessVsSigUtilization = (sigMonthlyBandwidthGB / 20 * 100).toFixed(2); // % of 20GB/month

            // Combine SIA and SPA subscription tiers
            let combinedTiers = [...siaSubscriptions, ...spaSubscriptions]
                .map(sub => sub.replace(/_/g, " ").toUpperCase())
                .join(", ");

            // User Band for SIA/SPA
            let userBand = secureAccessSigLowUtilizationSeats ? getUserBand(secureAccessSigLowUtilizationSeats) : getUserBand(totalSecureAccessUsers + secureAccessAdditionalSigUsers);
            let userBandWarning = enteredUserBand !== userBand
                ? `<span class="user-band-warning">(Changed from entered band: ${enteredUserBand})</span>`
                : "";

            let secureAccessAllowedSeats = ea === "Yes" ? Math.ceil((totalSecureAccessUsers + secureAccessAdditionalSigUsers) * 1.1) : 0;

            secureAccessOutput += `
                <b>Secure Access Subscription Tier:</b> ${combinedTiers}<br>
                <b>Number of Existing Umbrella Seats:</b> ${secureAccessBaseUsers}<br>
                ${spaSubscriptions.length > 0 ? `<b>SPA User Seat Count:</b> ${spaSeatCount}<br>` : ""}
                ${siaSubscriptions.length > 0 ? `<b>SIA User Seat Count:</b> ${siaSeatCount}<br>` : ""}
                <b>Total Secure Access Seats:</b> ${totalSecureAccessUsers}<br>
                <b>Secure Access Average Bandwidth Per User:</b> ${secureAccessSigAverageBandwidth} GB/day<br>
                <b>Secure Access Utilization:</b> ${secureAccessSigUtilization}%<br>
                ${secureAccessAdditionalSigUsers ? `<b>Additional Secure Access Users Required:</b> ${secureAccessAdditionalSigUsers}<br>` : ""}
                <b>Total Secure Access Data Limit:</b> ${secureAccessTotalDataLimit} GB/month<br>
                <b>Secure Access vs. Bandwidth:</b> ${secureAccessVsSigUtilization}%<br>
                ${ea === "Yes" ? `<b>EA Allowed Seats:</b> ${secureAccessAllowedSeats}<br>` : ""}
                <b>User Band:</b> ${userBand}${userBandWarning}<br>
                ${secureAccessSigLowUtilizationSeats ? `<div class="highlighted-box"><b>Total Secure Access Seat Count Required Based on Low Utilization:</b> ${secureAccessSigLowUtilizationSeats}</div><br>` : ""}
                ${!secureAccessSigLowUtilizationSeats ? `<div class="highlighted-box"><b>Total Secure Access Seat Count Required:</b> ${totalSecureAccessUsers + Number(secureAccessAdditionalSigUsers)}</div><br>` : ""}
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

    let printContainer;
    try {
        // Create print container
        printContainer = document.createElement("div");
        printContainer.className = "print-container";
        Object.assign(printContainer.style, {
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: "12pt",
            color: "#000",
            padding: "15mm",
            background: "#fff",
            width: "210mm",
            boxSizing: "border-box",
            position: "absolute",
            left: "-9999px" // Render off-screen
        });

        // Clone main container
        const mainContainer = document.querySelector(".container");
        const clonedContainer = mainContainer.cloneNode(true);

        // Remove buttons from clone
        const buttons = clonedContainer.querySelectorAll(".no-print");
        buttons.forEach(button => button.remove());

        // Map select values to display text
        const selectDisplayMap = {
            "ea": { "No": "No", "Yes": "Yes" },
            "subscription": {
                "select": "Select Umbrella Tier",
                "dns_essentials": "DNS Essentials",
                "dns_advantage": "DNS Advantage",
                "sig_essentials": "SIG Essentials",
                "sig_advantage": "SIG Advantage",
                "dns_edu": "DNS for EDU"
            },
            "add_students": { "No": "No", "Yes": "Yes" },
            "compare_secure_access": { "no": "No", "yes": "Yes" },
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
                    const inputValue = originalField.value || "";
                    clonedField.outerHTML = `<span>${inputValue}</span>`;
                }
            }
        });

        // Explicitly replace SPA and SIA seat count inputs
        const spaInput = document.getElementById("spa_seat_count_input");
        const siaInput = document.getElementById("sia_user_seat_count_input");
        const spaInputClone = clonedContainer.querySelector("#spa_seat_count_input");
        const siaInputClone = clonedContainer.querySelector("#sia_user_seat_count_input");
        if (spaInput && spaInputClone && document.getElementById("spa_seat_count").style.display === "block") {
            spaInputClone.outerHTML = `<span>${spaInput.value || ""}</span>`;
        }
        if (siaInput && siaInputClone && document.getElementById("sia_user_seat_count").style.display === "block") {
            siaInputClone.outerHTML = `<span>${siaInput.value || ""}</span>`;
        }

        // Ensure dynamic fields are visible
        const dynamicFields = clonedContainer.querySelectorAll("[style*='display: none']");
        dynamicFields.forEach(field => {
            if (field.id === "student_fields" && document.getElementById("add_students").value === "Yes") {
                field.style.display = "block";
            }
            if (field.id === "secure_access_fields" && document.getElementById("compare_secure_access").value === "yes") {
                field.style.display = "block";
                const note = field.querySelector(".secure-access-note");
                if (note) {
                    note.style.display = "block";
                    note.style.margin = "10px 0";
                }
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

        // Append to DOM temporarily (off-screen)
        document.body.appendChild(printContainer);

        // Initialize jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        // Split content into sections to avoid text splitting
        const sections = clonedContainer.querySelectorAll(".section, .output-section");
        let currentY = 10; // Start Y position
        const pageHeight = 297; // A4 height in mm
        const margin = 10;
        const maxContentHeight = pageHeight - 2 * margin;

        // Process each section as an image to ensure no text splitting
        const addSection = async (section, index) => {
            const canvas = await html2canvas(section, { scale: 1 });
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 190; // A4 width - margins
            const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

            // Check if section fits on current page
            if (currentY + imgHeight > maxContentHeight && index > 0) {
                doc.addPage();
                currentY = margin;
            }

            // Add image to PDF
            doc.addImage(imgData, "PNG", margin, currentY, imgWidth, imgHeight);
            currentY += imgHeight + 5; // Add spacing between sections

            return Promise.resolve();
        };

        // Process sections sequentially
        const promises = Array.from(sections).map((section, index) => addSection(section, index));
        Promise.all(promises).then(() => {
            doc.save("Umbrella_Calculator_Results.pdf");
            // Cleanup
            if (document.body.contains(printContainer)) {
                document.body.removeChild(printContainer);
            }
        });
    } catch (error) {
        console.error("Unexpected error during export:", error);
        alert("An unexpected error occurred during export. Please try again.");
        if (printContainer && document.body.contains(printContainer)) {
            document.body.removeChild(printContainer);
        }
    }
}