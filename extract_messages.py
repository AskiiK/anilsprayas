import re
import json
import os

html_path = "/Users/tnluser/anilsprayas/content/ANIL'S PRAYAS @Patna – Telegram.html"
output_path = "messages.json"

try:
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find message divs. 
    # Structure: <div class="tgme_widget_message_text js-message_text before_footer" dir="auto">CONTENT</div>
    # handling <span ...></span> at the end which seems common in the grep output.
    
    # We will use a non-greedy match for content.
    pattern = re.compile(r'<div class="tgme_widget_message_text[^"]*" dir="auto">(.*?)<', re.DOTALL)
    # The grep output showed <span style...> at the end of the div content sometimes, so checking up to the next tag start might cut it off or might be perfect. 
    # Let's be slightly more robust: match until the closing </div> but we need to handle nested tags if any. 
    # Given the grep output: <div ...>Text<br>Text<span ...></span></div>
    # The span seems to be for spacing/metadata.
    
    # Let's try to match the whole internal content and then clean it.
    pattern = re.compile(r'<div class="tgme_widget_message_text[^"]*" dir="auto">([\s\S]*?)</div>', re.DOTALL)
    
    matches = pattern.findall(content)
    
    clean_messages = []
    for m in matches:
        # Remove the trailing span if it exists (visibility hidden one)
        m = re.sub(r'<span style="display: inline-block; visibility: hidden;.*?</span>', '', m)
        
        # Replace <br> with newline
        text = m.replace('<br>', '\n').replace('<br/>', '\n')
        
        # Remove other tags if any (like links <a>) - keep text content of links
        text = re.sub(r'<[^>]+>', '', text)
        
        # Decode HTML entities
        text = text.replace('&nbsp;', ' ').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
        
        text = text.strip()
        
        # Filter out system messages
        if text and text not in ["Channel created", "Channel photo updated"]:
            clean_messages.append(text)

    print(f"Found {len(clean_messages)} messages.")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(clean_messages, f, ensure_ascii=False, indent=2)
        
    print(f"Saved to {output_path}")

except Exception as e:
    print(f"Error: {e}")
