import "cypress-wait-until";
import { EncryptJWT } from "jose";
import adminFixture from "@cypress/fixtures/admin.json";
import hkdf from "@panva/hkdf";

Cypress.Commands.addQuery("getById", (id: string) => {
  const getFn = cy.now(
    "get",
    `[data-testid="${id}"]`
  ) as () => Promise<HTMLElement>;
  return () => getFn();
});

Cypress.Commands.add(
  "getParentById",
  {
    prevSubject: "element",
  },
  (subject, id) => {
    return cy.wrap(subject).parents(`[data-testid="${id}"]`);
  }
);

Cypress.Commands.add(
  "getChildById",
  {
    prevSubject: "element",
  },
  (subject, id) => {
    return cy.wrap(subject).find(`[data-testid="${id}"]`);
  }
);

Cypress.Commands.addQuery("getByData", (name: string, value: string) => {
  const getFn = cy.now(
    "get",
    `[data-${name}="${value}"]`
  ) as () => Promise<HTMLElement>;
  return () => getFn();
});

Cypress.Commands.addQuery("getByName", (name: string) => {
  const getFn = cy.now("get", `[name="${name}"]`) as () => Promise<HTMLElement>;
  return () => getFn();
});

Cypress.Commands.add("login", () => {
  cy.wrap(null)
    .then(async () => {
      const secret = Cypress.env(`AUTH_SECRET`);

      const key = await hkdf(
        "sha256",
        secret,
        "",
        "NextAuth.js Generated Encryption Key",
        32
      );

      const expiresIn = (Date.now() + 1000 * 60 * 60 * 24) / 1000;

      const encrypted = await new EncryptJWT(adminFixture)
        .setIssuedAt()
        .setExpirationTime(expiresIn)
        .setJti(crypto.randomUUID())
        .setProtectedHeader({
          alg: "dir",
          enc: "A256GCM",
        })
        .encrypt(key);

      return encrypted;
    })
    .then((encryptedToken) => {
      cy.setCookie("next-auth.session-token", encryptedToken);
      cy.setCookie("__Secure-next-auth.session-token", encryptedToken, {
        secure: true,
      });
    });
});
