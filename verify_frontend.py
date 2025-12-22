from playwright.sync_api import sync_playwright

def verify_game_action():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")
            page.wait_for_load_state("networkidle")

            # Start New Game
            page.get_by_role("button", name="Bắt đầu mới").click()
            page.wait_for_timeout(1000)

            # Select Pinky
            pinky_card = page.get_by_role("button", name="Pinky [Agile Runner]")
            if pinky_card.is_visible():
                pinky_card.click()
            else:
                 page.get_by_text("Pinky").click()

            page.wait_for_timeout(1000)

            # Select Easy
            easy_card = page.get_by_role("button", name="EASY [Khởi động nhẹ nhàng]")
            if easy_card.is_visible():
                easy_card.click()
            else:
                page.get_by_text("EASY").click()

            page.wait_for_timeout(2000)

            # Find the block "Send Red Message"
            # It might be in a list of options.
            # The screenshot shows "Send Red Message" in a yellow block.
            # We can click it.

            # Assuming the first level for Easy is "Send Red Message" (based on screenshot)
            # If random, we might need to search for any block.

            # Let's try to click the block that contains "Send Red Message"
            block = page.get_by_text("Send Red Message")
            if block.count() > 0:
                print("Found block, clicking...")
                block.first.click()

                # Wait for animation to start (throw is 1000ms duration)
                # We want to catch the envelope in mid-air
                page.wait_for_timeout(500)
                page.screenshot(path="verification_envelope.png")
                print("Screenshot taken.")
            else:
                print("Block 'Send Red Message' not found. Maybe random level?")
                page.screenshot(path="verification_game_screen_debug.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_game_action()
