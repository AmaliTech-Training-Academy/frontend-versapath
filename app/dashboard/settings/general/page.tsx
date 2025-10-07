"use client";

import { useState } from "react";

export default function GeneralSettingsPage() {
  const [settings, setSettings] = useState({
    platformName: "VersaPath v1.0.0",
    description:
      "An intelligent, modular, and scalable platform built to accelerate the skill development, career growth, and staffing readiness of software engineers.",
    supportEmail: "paul.terku@amalitech.com",
    supportPhone: "+233 254 254 164",
    notifyUserRegistration: true,
    notifySystemAlerts: false,
    notifySecurityAlerts: false,
    notifyBackup: true,
    notifyUpdate: false,
    language: "en-UK",
    timezone: "UTC",
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">General Settings</h2>
      <form className="space-y-8">
        {/* Platform Information */}
        <section>
          <h3 className="font-semibold mb-4">Platform Information</h3>
          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="font-medium" htmlFor="backup-notifications-checkbox">Platform Name</label>
            <div className="col-span-2">{settings.platformName}</div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Description</label>
            <div className="col-span-2">{settings.description}</div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Support Email</label>
            <div className="col-span-2">
              <input
                type="email"
                className="input input-bordered w-full"
                value={settings.supportEmail}
                onChange={e =>
                  setSettings(s => ({ ...s, supportEmail: e.target.value }))
                }
              />
            </div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Support Phone</label>
            <div className="col-span-2">
              <input
                type="tel"
                className="input input-bordered w-full"
                value={settings.supportPhone}
                onChange={e =>
                  setSettings(s => ({ ...s, supportPhone: e.target.value }))
                }
              />
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-4">Notifications</h3>
          <div className="grid grid-cols-3 gap-6 items-center">
            <label className="font-medium" htmlFor="backup-notifications-checkbox">User Registration</label>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifyUserRegistration}
                onChange={e =>
                  setSettings(s => ({
                    ...s,
                    notifyUserRegistration: e.target.checked,
                  }))
                }
                className="checkbox"
              />
              <span>Notify when new users register</span>
            </div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">System Alerts</label>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifySystemAlerts}
                onChange={e =>
                  setSettings(s => ({
                    ...s,
                    notifySystemAlerts: e.target.checked,
                  }))
                }
                className="checkbox"
              />
              <span>Critical system notifications</span>
            </div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Security Alerts</label>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifySecurityAlerts}
                onChange={e =>
                  setSettings(s => ({
                    ...s,
                    notifySecurityAlerts: e.target.checked,
                  }))
                }
                className="checkbox"
              />
              <span>Security-related notifications</span>
            </div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Backup Notifications</label>
            <div className="col-span-2 flex items-center gap-2">
              <input
                id="backup-notifications-checkbox"
                type="checkbox"
                checked={settings.notifyBackup}
                onChange={e =>
                  setSettings(s => ({
                    ...s,
                    notifyBackup: e.target.checked,
                  }))
                }
                className="checkbox"
              />
              <span>Backup status notifications</span>
            </div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Update Notifications</label>
            <div className="col-span-2 flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.notifyUpdate}
                onChange={e =>
                  setSettings(s => ({
                    ...s,
                    notifyUpdate: e.target.checked,
                  }))
                }
                className="checkbox"
              />
              <span>System update</span>
            </div>
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-4">Localization</h3>
          <div className="grid grid-cols-3 gap-6 items-center">
            <label className="font-medium" htmlFor="backup-notifications-checkbox">Default Language</label>
            <div className="col-span-2">
              <select
                className="select select-bordered w-full"
                value={settings.language}
                onChange={e =>
                  setSettings(s => ({ ...s, language: e.target.value }))
                }
              >
                <option value="en-UK">English (UK)</option>
                <option value="en-US">English (US)</option>
              </select>
            </div>

            <label className="font-medium" htmlFor="backup-notifications-checkbox">Timezone</label>
            <div className="col-span-2">
              <select
                className="select select-bordered w-full"
                value={settings.timezone}
                onChange={e =>
                  setSettings(s => ({ ...s, timezone: e.target.value }))
                }
              >
                <option value="UTC">UTC (+00:00)</option>
              </select>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}