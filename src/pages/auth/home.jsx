import { useNavigate } from "react-router-dom";
import "../../App.css";

import React from "react";

export default function LandingPage() {
  return (
    <div className="landing-wrapper">
      {/* NAVBAR */}
      <nav className="landing-navbar">
        <div className="landing-brand">
          📊 My<span>Duka</span>
        </div>
        <div className="landing-nav-actions">
          <a href="/auth/login" className="btn btn-secondary">Login</a>
          <a href="/register-merchant" className="btn btn-primary">Registration</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="landing-hero">
        <span className="inventory-label">INVENTORY MANAGEMENT</span>
        <h1>Manage Your Store.<br />Grow Your Business.</h1>
        <p className="landing-hero-sub">
          MyDuka makes inventory management simple. Track your stock, monitor payments, manage your team, and understand your business through powerful reports.
        </p>

        {/* HERO METRICS CARD */}
          <div className="dashboard-card hero-metrics-card">
          <div className="metric-item">
            <span className="stat-card-label">Total Stock</span>
            <div className="stat-card-value">1,240</div>
            <span className="metric-growth">+12.5%</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="stat-card-label">Products</span>
            <div className="stat-card-value">86</div>
            <span className="metric-growth">+8.2%</span>
          </div>
          <div className="metric-divider"></div>
          <div className="metric-item">
            <span className="stat-card-label">Suppliers</span>
            <div className="stat-card-value">24</div>
            <span className="metric-growth">+4.7%</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="landing-features">
        <span className="inventory-label">EVERYTHING YOU NEED</span>
        <h2>Your store, under control.</h2>
        <p className="landing-section-sub">Powerful tools to help you manage your inventory and make better decisions.</p>

        <div className="features-grid">
          <div className="dashboard-card feature-card">
            <div className="stat-card-icon">📦</div>
            <h3>Inventory Tracking</h3>
            <p>Know exactly what is in stock, what has been received and what has been spoilt.</p>
          </div>

          <div className="dashboard-card feature-card">
            <div className="stat-card-icon">📊</div>
            <h3>Smart Reports</h3>
            <p>View weekly, monthly and annual reports using easy-to-understand graphs.</p>
          </div>

          <div className="dashboard-card feature-card">
            <div className="stat-card-icon">💰</div>
            <h3>Payment Tracking</h3>
            <p>Easily separate paid and unpaid supplier payments.</p>
          </div>

          <div className="dashboard-card feature-card">
            <div className="stat-card-icon">👥</div>
            <h3>Team Management</h3>
            <p>Manage merchants, store admins and clerks with secure role-based access.</p>
          </div>
        </div>
      </section>

      {/* BOTTOM BANNER / CTA */}
      <section className="landing-cta">
        <span className="inventory-label">WHY MYDUKA?</span>
        <h2>Less paperwork. Better decisions.</h2>
        <p>MyDuka gives businesses a simple way to keep track of their inventory and store performance. Instead of relying on notebooks and spreadsheets, your team can access accurate information from one place.</p>
        
        <div className="cta-box dashboard-card">
          <h3>Ready to take control of your inventory?</h3>
          <p>Start managing your store with MyDuka.</p>
          <a href="/register-merchant" className="btn btn-primary">Get Started</a>
        </div>
      </section>
    </div>
  );
}
   home.jsx
