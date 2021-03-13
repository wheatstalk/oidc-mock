export interface AuthCodeFlowState {
  readonly clientId: string;
  readonly scope: string;
  readonly nonce?: string;
  readonly nonceUsed: boolean;
}

export interface IAuthCodeFlowStateRepository {
  store(code: string, state: AuthCodeFlowState): Promise<void>;
  getByCode(code: string): Promise<AuthCodeFlowState>;
}

export class AuthCodeFlowStateRepository implements IAuthCodeFlowStateRepository {
  static authStateRepository(): IAuthCodeFlowStateRepository {
    return this.singleton;
  }
  private static singleton: IAuthCodeFlowStateRepository = new AuthCodeFlowStateRepository();
  private readonly repository = new Map<string, AuthCodeFlowState>();

  async store(code: string, state: AuthCodeFlowState): Promise<void> {
    this.repository.set(code, state);
  }

  async getByCode(code: string): Promise<AuthCodeFlowState> {
    const sessionState = this.repository.get(code);
    if (!sessionState) {
      throw new Error(`Unknown code ${code}`);
    }

    return sessionState;
  }
}