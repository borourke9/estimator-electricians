# Client Integration Guide

This document provides integration snippets for clients to embed their branded estimator on their website.

## Available Client URLs

- **ACME Electric**: `https://yourdomain.com/estimate/acme-electric`
- **Bright Power**: `https://yourdomain.com/estimate/bright-power`
- **NexGen Electric**: `https://yourdomain.com/estimate/nexgen`

## Integration Methods

### 1. Hosted Link (Fastest)

Simply link to your branded estimator:

```html
<a href="https://yourdomain.com/estimate/acme-electric" 
   class="btn btn-primary">
  Get Instant Estimate
</a>
```

### 2. Inline Embed (iframe)

Works on Webflow, WordPress, Squarespace, etc.:

```html
<div style="max-width:900px;margin:0 auto">
  <iframe src="https://yourdomain.com/estimate/acme-electric"
          width="100%" height="780" frameborder="0"
          style="border:0;border-radius:16px;overflow:hidden;">
  </iframe>
</div>
```

### 3. Modal Launcher

Button that opens the estimator in a new tab:

```html
<button id="open-estimator" 
        style="padding:12px 16px;border-radius:10px;background:#0E7C66;color:#fff;font-weight:600">
  Get Instant Estimate
</button>

<script>
  document.getElementById('open-estimator').onclick = () =>
    window.open('https://yourdomain.com/estimate/acme-electric', '_blank', 'noopener,noreferrer');
</script>
```

### 4. Advanced Modal (iframe overlay)

For a true modal experience:

```html
<button id="open-estimator-modal">Get Instant Estimate</button>

<div id="estimator-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;">
  <div style="position:relative;width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:20px;">
    <div style="background:white;border-radius:16px;width:100%;max-width:900px;height:780px;position:relative;">
      <button id="close-modal" style="position:absolute;top:10px;right:15px;background:none;border:none;font-size:24px;cursor:pointer;z-index:1001;">×</button>
      <iframe src="https://yourdomain.com/estimate/acme-electric"
              width="100%" height="100%" frameborder="0"
              style="border:0;border-radius:16px;">
      </iframe>
    </div>
  </div>
</div>

<script>
  document.getElementById('open-estimator-modal').onclick = () => {
    document.getElementById('estimator-modal').style.display = 'block';
  };
  
  document.getElementById('close-modal').onclick = () => {
    document.getElementById('estimator-modal').style.display = 'none';
  };
  
  // Close on background click
  document.getElementById('estimator-modal').onclick = (e) => {
    if (e.target.id === 'estimator-modal') {
      document.getElementById('estimator-modal').style.display = 'none';
    }
  };
</script>
```

## Customization

### Colors
Each client has their own color scheme:
- **ACME Electric**: Green theme (#0E7C66, #0BBF7A)
- **Bright Power**: Blue theme (#1F4AFF, #7DA3FF)
- **NexGen Electric**: Emerald theme (#059669, #10B981)

### Logo
Clients can have their logo displayed in the header by providing a `logoUrl` in their configuration.

### Webhook Integration
Each client can have their own webhook URL for lead capture, or use the default system webhook.

## Lead Data Format

When a lead is submitted, the following data is sent to the webhook:

```json
{
  "vertical": "electrician",
  "brand": "ACME Electric",
  "clientSlug": "acme-electric",
  "webhookUrl": "https://hooks.zapier.com/hooks/catch/acme/123",
  "service": "generator",
  "property": "single",
  "scope": "small",
  "estimate": {
    "min": 3500,
    "max": 6500,
    "monthly": 106
  },
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-1234",
  "ts": 1703123456789
}
```

## Support

For technical support or customization requests, contact your account manager.
