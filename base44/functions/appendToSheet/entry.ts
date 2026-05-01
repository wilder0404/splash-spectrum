import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SHEET_ID = '1-MlRv8Gx4iWNIDXGoyCQ2E_tC5py_nnxo3asQC05VK4';
const SHEET_RANGE = 'Sheet1!A:C';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { name, email, phone } = await req.json();

    const { accessToken } = await base44.asServiceRole.connectors.getConnection('googlesheets');

    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [[name, phone, email]],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ error: data.error?.message || 'Failed to append to sheet' }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});