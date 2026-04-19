"use client";
import React from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

/**
 * Global Floating WhatsApp Button
 * Professional WhatsApp chat widget using react-floating-whatsapp
 */
const WhatsAppButton = () => {
  return (
    <div className="relative z-9999" style={{ isolation: 'isolate' }}>
      <FloatingWhatsApp
        phoneNumber="94773536566"
        accountName="IVTC Campus"
        avatar="/ivtc_logo.png" // Using your existing logo
        statusMessage="Typically replies within 1 hour"
        chatMessage="Hello! 👋 How can we help you today?"
        placeholder="Type a message..."
        notification
        notificationDelay={60000} // Show notification after 60 seconds
        notificationSound
      />
    </div>
  );
};

export default WhatsAppButton;
