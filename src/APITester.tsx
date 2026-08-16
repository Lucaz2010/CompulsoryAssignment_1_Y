import { useRef, type FormEvent } from "react";

export function APITester() {


  return (
    <div className="api-tester">


        <input type="text" name="endpoint" defaultValue="/api/hello" className="url-input" placeholder="/api/hello" />
        <button type="submit" className="send-button">
          Send Davide para aaaaaaaaa
        </button>

    </div>
  );
}
